import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    OutlinedInput,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./componentes/header";
import Footer from "./componentes/footer";
import {Product} from "../dtos/product.dto";
import {deleteProduct, getProductStores, save, update} from "../services/products.service";
import {getCategory} from "../services/category.service";
import {Category} from "../dtos/category.dto";
import {toast} from "react-toastify";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {InferType} from "yup";
import ProductCardEdit from "./componentes/cardProductEdit";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const schema = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    description: yup.string().required("Descrição é obrigatória"),
    price: yup
        .number()
        .typeError("Preço deve ser um número")
        .positive("Preço deve ser positivo")
        .required("Preço é obrigatório"),
    image: yup.string().url("URL inválida").required("Imagem é obrigatória"),
    categoryIds: yup
        .array()
        .of(yup.string().required())
        .min(1, "Selecione pelo menos uma categoria")
        .required("Categorias são obrigatórias"),
});

type FormData = InferType<typeof schema>;

export default function ProductsCrudPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await getProductStores();
            setProducts(response.content || []);
            const catResponse = await getCategory();
            setCategories(catResponse || []);
        };
        fetchData();
    }, []);

    const handleOpenModal = (product?: Product) => {
        setEditingProduct(product || null);
        reset(
            product
                ? {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image: product.imageUrl || "",
                    categoryIds: product.categories?.map((c) => c.id.toString()) || [],
                }
                : { name: "", description: "", price: 0, image: "", categoryIds: [] }
        );
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setEditingProduct(null);
    };

    const onSubmit = async (form: FormData) => {
        const selectedCategories = form.categoryIds
            .map((id) => categories.find((cat) => cat.id.toString() === id))
            .filter((cat): cat is Category => cat !== undefined);

        const productToSend = {
            name: form.name,
            description: form.description,
            price: form.price,
            imageUrl: form.image,
            categories: selectedCategories,
        };

        try {
            let savedProduct: Product;
            if (editingProduct) {
                const editProduct = {
                    id: editingProduct.id,
                    ...productToSend,
                };
                savedProduct = await update(editProduct);
            } else {
                savedProduct = await save(productToSend);
            }

            setProducts((prev) =>
                editingProduct
                    ? prev.map((p) => (p.id === editingProduct.id ? savedProduct : p))
                    : [...prev, savedProduct]
            );

            handleCloseModal();
            toast.success(editingProduct ? "Produto atualizado!" : "Produto cadastrado!");
        } catch (error) {
            toast.error("Erro ao salvar produto");
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            setProducts((prev) => prev.filter((p) => p.id !== id));
            toast.success("Produto excluído com sucesso!");
        } catch (err) {
            toast.error("Erro ao excluir produto");
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb", display: "flex", flexDirection: "column" }}>
            <Header />
            <Box component="section" sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4, flex: "1 0 auto" }}>
                <Typography variant="h4" fontWeight="bold" mb={3}>
                    Produtos
                </Typography>
                <Button variant="contained" onClick={() => handleOpenModal()} sx={{ mb: 4 }}>
                    Adicionar Produto
                </Button>

                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 4 }}>
                    {products.map((product) => (
                        <ProductCardEdit
                            key={product.id}
                            product={product}
                            handleOpenModal={handleOpenModal}
                            handleDelete={handleDelete}
                        />
                    ))}
                </Box>

                <Modal open={modalOpen} onClose={handleCloseModal}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                            width: 400,
                        }}
                    >
                        <Typography variant="h6" mb={2}>
                            {editingProduct ? "Editar Produto" : "Novo Produto"}
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        label="Nome"
                                        fullWidth
                                        {...field}
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        label="Descrição"
                                        fullWidth
                                        {...field}
                                        error={!!errors.description}
                                        helperText={errors.description?.message}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.categoryIds}>
                                <InputLabel id="category-multiple-label">Categorias</InputLabel>
                                <Controller
                                    name="categoryIds"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="category-multiple-label"
                                            multiple
                                            input={<OutlinedInput label="Categorias" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                                    {selected.map((id) => {
                                                        const cat = categories.find((c) => c.id.toString() === id);
                                                        return cat ? <Chip key={id} label={cat.name} /> : null;
                                                    })}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {categories.map((cat) => (
                                                <MenuItem key={cat.id} value={cat.id.toString()}>
                                                    {cat.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <Typography variant="caption" color="error">
                                    {errors.categoryIds?.message}
                                </Typography>
                            </FormControl>

                            <Controller
                                name="price"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        label="Preço"
                                        type="number"
                                        fullWidth
                                        {...field}
                                        error={!!errors.price}
                                        helperText={errors.price?.message}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            <Controller
                                name="image"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        label="URL da Imagem"
                                        fullWidth
                                        {...field}
                                        error={!!errors.image}
                                        helperText={errors.image?.message}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            <Button variant="contained" fullWidth type="submit">
                                Salvar
                            </Button>
                        </form>
                    </Box>
                </Modal>
            </Box>
            <Footer />
        </Box>
    );
}
