# Algoritmos básicos de álgebra linear (desde C++26)

Algoritmos básicos de álgebra linear são baseados nas Sub-rotinas Básicas de Álgebra Linear densas ([BLAS](<https://en.wikipedia.org/wiki/Basic_Linear_Algebra_Subprograms> "enwiki:Basic Linear Algebra Subprograms")), que correspondem a um subconjunto do [Padrão BLAS](<http://www.netlib.org/blas/blast-forum/blas-report.pdf>). Esses algoritmos que acessam os elementos de arrays visualizam esses elementos através de std::mdspan representando um vetor ou uma matriz.

Os algoritmos BLAS são categorizados em três conjuntos de operações chamados _níveis_, que geralmente correspondem ao grau do polinômio nas complexidades dos algoritmos:

  * [BLAS 1](<https://en.wikipedia.org/wiki/Basic_Linear_Algebra_Subprograms#Level_1> "enwiki:Basic Linear Algebra Subprograms"): Todos os algoritmos com parâmetros std::mdspan realizam uma contagem de acessos a arrays std::mdspan e operações aritméticas que são _lineares_ no produto máximo das extensões de qualquer parâmetro std::mdspan. Esses algoritmos contêm operações de _vetor_, como produtos escalares, normas e adição de vetores.
  * [BLAS 2](<https://en.wikipedia.com/wiki/Basic_Linear_Algebra_Subprograms#Level_2> "enwiki:Basic Linear Algebra Subprograms"): Todos os algoritmos têm complexidade geral em tempo _quadrático_. Esses algoritmos contêm operações _matriz-vetor_, como multiplicações matriz-vetor e um resolvedor de sistema linear triangular.
  * [BLAS 3](<https://en.wikipedia.com/wiki/Basic_Linear_Algebra_Subprograms#Level_3> "enwiki:Basic Linear Algebra Subprograms"): Todos os algoritmos têm complexidade geral em tempo _cúbico_. Esses algoritmos contêm operações _matriz-matriz_, como multiplicações matriz-matriz e um resolvedor de múltiplos sistemas lineares triangulares.

### Transformações in-place

---
Definido no header `[<linalg>](<#/doc/header/linalg>)`

```cpp
Definido no namespace `std::linalg`
 scaled_accessor")(C++26)
(modelo de classe)
 conjugated_accessor")(C++26)
(modelo de classe)
 layout_transpose")(C++26)
(modelo de classe)
 scaled")(C++26)
(modelo de função)
 conjugated")(C++26)
(modelo de função)
 transposed")(C++26)
(modelo de função)
 conjugate_transposed")(C++26)
(modelo de função)
```

### Funções BLAS 1

Definido no header `[<linalg>](<#/doc/header/linalg>)`

```cpp
Definido no namespace `std::linalg`
 setup_givens_rotation")(C++26)
(modelo de função)
 apply_givens_rotation")(C++26)
(modelo de função)
 swap_elements")(C++26)
(modelo de função)
 scale")(C++26)
(modelo de função)
 copy")(C++26)
(modelo de função)
 add")(C++26)
(modelo de função)
 dot")(C++26)
(modelo de função)
 dotc")(C++26)
(modelo de função)
 vector_sum_of_squares")(C++26)
(modelo de função)
 vector_two_norm")(C++26)
(modelo de função)
 vector_abs_sum")(C++26)
(modelo de função)
 vector_idx_abs_max")(C++26)
(modelo de função)
 matrix_frob_norm")(C++26)
(modelo de função)
 matrix_one_norm")(C++26)
(modelo de função)
 matrix_inf_norm")(C++26)
(modelo de função)
```

### Funções BLAS 2

Definido no header `[<linalg>](<#/doc/header/linalg>)`

```cpp
Definido no namespace `std::linalg`
 matrix_vector_product")(C++26)
(modelo de função)
 symmetric_matrix_vector_product")(C++26)
(modelo de função)
 hermitian_matrix_vector_product")(C++26)
(modelo de função)
 triangular_matrix_vector_product")(C++26)
(modelo de função)
 triangular_matrix_vector_solve")(C++26)
(modelo de função)
 matrix_rank_1_update")(C++26)
(modelo de função)
 matrix_rank_1_update_c")(C++26)
(modelo de função)
 symmetric_matrix_rank_1_update")(C++26)
(modelo de função)
 hermitian_matrix_rank_1_update")(C++26)
(modelo de função)
 hermitian_matrix_rank_2_update")(C++26)
(modelo de função)
 hermitian_matrix_rank_2_update")(C++26)
(modelo de função)
```

### Funções BLAS 3

Definido no header `[<linalg>](<#/doc/header/linalg>)`

```cpp
Definido no namespace `std::linalg`
 matrix_product")(C++26)
(modelo de função)
 symmetric_matrix_product")(C++26)
(modelo de função)
 hermitian_matrix_product")(C++26)
(modelo de função)
 triangular_matrix_producttriangular_matrix_left_producttriangular_matrix_right_product")(C++26)
(modelo de função)
 symmetric_matrix_rank_k_update")(C++26)
(modelo de função)
 hermitian_matrix_rank_k_update")(C++26)
(modelo de função)
 symmetric_matrix_rank_2k_update")(C++26)
(modelo de função)
 hermitian_matrix_rank_2k_update")(C++26)
(modelo de função)
 triangular_matrix_matrix_left_solvetriangular_matrix_matrix_right_solve")(C++26)
(modelo de função)
```

### Itens auxiliares

Definido no header `[<linalg>](<#/doc/header/linalg>)`

```cpp
Definido no namespace `std::linalg`
 column_majorrow_majorcolumn_major_trow_major_t")(C++26)
(tag)
 upper_trianglelower_triangleupper_triangle_tlower_triangle_t")(C++26)
(tag)
 implicit_unit_diagonalexplicit_diagonalimplicit_unit_diagonal_texplicit_diagonal_t")(C++26)
(tag)
 layout_blas_packed")(C++26)
(modelo de classe)
```

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
`__cpp_lib_linalg` | `202311L` | (C++26) | Algoritmos básicos de álgebra linear (BLAS)

### Exemplo

Run this code
```cpp
    #include <cassert>
    #include <cstddef>
    #include <execution>
    #include <linalg>
    #include <mdspan>
    #include <numeric>
    #include <vector>
    
    int main()
    {
        std::vector<double> x_vec(42);
        std::ranges::iota(x_vec, 0.0);
    
        std::mdspan x(x_vec.data(), x_vec.size());
    
        // x[i] *= 2.0, executed sequentially
        std::linalg::scale(2.0, x);
    
        // x[i] *= 3.0, executed in parallel
        std::linalg::scale(std::execution::par_unseq, 3.0, x);
    
        for (std::size_t i{}; i != x.size(); ++i)
            assert(x[i] == 6.0 * static_cast<double>(i));
    }
```

### Links externos

1.  | [Página inicial do BLAS](<http://www.netlib.org/blas/>)
---|---
2.  | [Fórum Técnico BLAS](<http://www.netlib.org/blas/blast-forum/>)