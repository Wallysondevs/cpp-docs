# Cabeçalho da biblioteca padrão &lt;linalg&gt; (C++26)

Este cabeçalho faz parte da biblioteca [numeric](<#/doc/numeric>).

### Classes

---
Definido no namespace `std::linalg`

```cpp
 layout_blas_packed")(C++26)
(modelo de classe)
 scaled_accessor")(C++26)
(modelo de classe)
 conjugated_accessor")(C++26)
(modelo de classe)
 layout_transpose")(C++26)
(modelo de classe)
```

### Tags

Definido no namespace `std::linalg`

```cpp
 column_majorrow_majorcolumn_major_trow_major_t")(C++26)
(tag)
 upper_trianglelower_triangleupper_triangle_tlower_triangle_t")(C++26)
(tag)
 implicit_unit_diagonalexplicit_diagonalimplicit_unit_diagonal_texplicit_diagonal_t")(C++26)
(tag)
```

### Funções

Definido no namespace `std::linalg`

##### Transformações in-place

[ scaled](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/scaled&action=edit&redlink=1> "cpp/numeric/linalg/scaled \(page does not exist\)")(C++26) | retorna um novo `std::mdspan` somente leitura calculado pelo produto elemento a elemento do fator de escala e os elementos correspondentes do `std::mdspan` fornecido
(modelo de função)
[ conjugated](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/conjugated&action=edit&redlink=1> "cpp/numeric/linalg/conjugated \(page does not exist\)")(C++26) | retorna um novo `std::mdspan` somente leitura cujos elementos são os conjugados complexos dos elementos correspondentes do `std::mdspan` fornecido
(modelo de função)
[ transposed](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/transposed&action=edit&redlink=1> "cpp/numeric/linalg/transposed \(page does not exist\)")(C++26) | retorna um novo `std::mdspan` representando a transposta da matriz de entrada pelo `std::mdspan` fornecido
(modelo de função)
[ conjugate_transposed](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/conjugate_transposed&action=edit&redlink=1> "cpp/numeric/linalg/conjugate transposed \(page does not exist\)")(C++26) | retorna uma view de transposta conjugada de um objeto
(modelo de função)

##### Funções BLAS 1

[ setup_givens_rotation](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/setup_givens_rotation&action=edit&redlink=1> "cpp/numeric/linalg/setup givens rotation \(page does not exist\)")(C++26) | gera rotação plana
(modelo de função)
[ apply_givens_rotation](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/apply_givens_rotation&action=edit&redlink=1> "cpp/numeric/linalg/apply givens rotation \(page does not exist\)")(C++26) | aplica rotação plana a vetores
(modelo de função)
[ swap_elements](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/swap_elements&action=edit&redlink=1> "cpp/numeric/linalg/swap elements \(page does not exist\)")(C++26) | troca todos os elementos correspondentes de matriz ou vetor
(modelo de função)
[ scale](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/scale&action=edit&redlink=1> "cpp/numeric/linalg/scale \(page does not exist\)")(C++26) | sobrescreve matriz ou vetor com o resultado do cálculo da multiplicação elemento a elemento por um escalar
(modelo de função)
[ copy](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/copy&action=edit&redlink=1> "cpp/numeric/linalg/copy \(page does not exist\)")(C++26) | copia elementos de uma matriz ou vetor para outro
(modelo de função)
[ add](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/add&action=edit&redlink=1> "cpp/numeric/linalg/add \(page does not exist\)")(C++26) | adiciona vetores ou matrizes elemento a elemento
(modelo de função)
[ dot](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/dot&action=edit&redlink=1> "cpp/numeric/linalg/dot \(page does not exist\)")(C++26) | retorna o produto escalar não conjugado de dois vetores
(modelo de função)
[ dotc](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/dotc&action=edit&redlink=1> "cpp/numeric/linalg/dotc \(page does not exist\)")(C++26) | retorna o produto escalar conjugado de dois vetores
(modelo de função)
[ vector_sum_of_squares](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/vector_sum_of_squares&action=edit&redlink=1> "cpp/numeric/linalg/vector sum of squares \(page does not exist\)")(C++26) | retorna a soma escalonada dos quadrados dos elementos do vetor
(modelo de função)
[ vector_two_norm](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/vector_two_norm&action=edit&redlink=1> "cpp/numeric/linalg/vector two norm \(page does not exist\)")(C++26) | retorna a norma euclidiana de um vetor
(modelo de função)
[ vector_abs_sum](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/vector_abs_sum&action=edit&redlink=1> "cpp/numeric/linalg/vector abs sum \(page does not exist\)")(C++26) | retorna a soma dos valores absolutos dos elementos do vetor
(modelo de função)
[ vector_idx_abs_max](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/vector_idx_abs_max&action=edit&redlink=1> "cpp/numeric/linalg/vector idx abs max \(page does not exist\)")(C++26) | retorna o índice do valor absoluto máximo dos elementos do vetor
(modelo de função)
[ matrix_frob_norm](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/matrix_frob_norm&action=edit&redlink=1> "cpp/numeric/linalg/matrix frob norm \(page does not exist\)")(C++26) | retorna a norma de Frobenius de uma matriz
(modelo de função)
[ matrix_one_norm](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/matrix_one_norm&action=edit&redlink=1> "cpp/numeric/linalg/matrix one norm \(page does not exist\)")(C++26) | retorna a norma um de uma matriz
(modelo de função)
[ matrix_inf_norm](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/matrix_inf_norm&action=edit&redlink=1> "cpp/numeric/linalg/matrix inf norm \(page does not exist\)")(C++26) | retorna a norma infinito de uma matriz
(modelo de função)

##### Funções BLAS 2

[ matrix_vector_product](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/matrix_vector_product&action=edit&redlink=1> "cpp/numeric/linalg/matrix vector product \(page does not exist\)")(C++26) | calcula o produto matriz-vetor
(modelo de função)
[ symmetric_matrix_vector_product](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/symmetric_matrix_vector_product&action=edit&redlink=1> "cpp/numeric/linalg/symmetric matrix vector product \(page does not exist\)")(C++26) | calcula o produto matriz-vetor simétrico
(modelo de função)
[ hermitian_matrix_vector_product](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/hermitian_matrix_vector_product&action=edit&redlink=1> "cpp/numeric/linalg/hermitian matrix vector product \(page does not exist\)")(C++26) | calcula o produto matriz-vetor Hermitiano
(modelo de função)
[ triangular_matrix_vector_product](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/triangular_matrix_vector_product&action=edit&redlink=1> "cpp/numeric/linalg/triangular matrix vector product \(page does not exist\)")(C++26) | calcula o produto matriz-vetor triangular
(modelo de função)
[ triangular_matrix_vector_solve](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/triangular_matrix_vector_solve&action=edit&redlink=1> "cpp/numeric/linalg/triangular matrix vector solve \(page does not exist\)")(C++26) | resolve um sistema linear triangular
(modelo de função)
[ matrix_rank_1_update](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/matrix_rank_1_update&action=edit&redlink=1> "cpp/numeric/linalg/matrix rank 1 update \(page does not exist\)")(C++26) | realiza uma atualização de posto 1 não simétrica e não conjugada de uma matriz
(modelo de função)
[ matrix_rank_1_update_c](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/matrix_rank_1_update_c&action=edit&redlink=1> "cpp/numeric/linalg/matrix rank 1 update c \(page does not exist\)")(C++26) | realiza uma atualização de posto 1 não simétrica e conjugada de uma matriz
(modelo de função)
[ symmetric_matrix_rank_1_update](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/symmetric_matrix_rank_1_update&action=edit&redlink=1> "cpp/numeric/linalg/symmetric matrix rank 1 update \(page does not exist\)")(C++26) | realiza uma atualização de posto 1 de uma matriz simétrica
(modelo de função)
[ hermitian_matrix_rank_1_update](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/hermitian_matrix_rank_1_update&action=edit&redlink=1> "cpp/numeric/linalg/hermitian matrix rank 1 update \(page does not exist\)")(C++26) | realiza uma atualização de posto 1 de uma matriz Hermitiana
(modelo de função)
[ hermitian_matrix_rank_2_update](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/hermitian_matrix_rank_2_update&action=edit&redlink=1> "cpp/numeric/linalg/hermitian matrix rank 2 update \(page does not exist\)")(C++26) | realiza uma atualização de posto 2 de uma matriz simétrica
(modelo de função)
[ hermitian_matrix_rank_2_update](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/hermitian_matrix_rank_2_update&action=edit&redlink=1> "cpp/numeric/linalg/hermitian matrix rank 2 update \(page does not exist\)")(C++26) | realiza uma atualização de posto 2 de uma matriz Hermitiana
(modelo de função)

##### Funções BLAS 3

[ matrix_product](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/matrix_product&action=edit&redlink=1> "cpp/numeric/linalg/matrix product \(page does not exist\)")(C++26) | calcula o produto matriz-matriz
(modelo de função)
[ symmetric_matrix_product](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/symmetric_matrix_product&action=edit&redlink=1> "cpp/numeric/linalg/symmetric matrix product \(page does not exist\)")(C++26) | calcula o produto matriz-matriz simétrico
(modelo de função)
[ hermitian_matrix_product](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/hermitian_matrix_product&action=edit&redlink=1> "cpp/numeric/linalg/hermitian matrix product \(page does not exist\)")(C++26) | calcula o produto matriz-matriz Hermitiano
(modelo de função)
[ triangular_matrix_producttriangular_matrix_left_producttriangular_matrix_right_product](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/triangular_matrix_product&action=edit&redlink=1> "cpp/numeric/linalg/triangular matrix product \(page does not exist\)")(C++26) | calcula o produto matriz-matriz triangular
(modelo de função)
[ symmetric_matrix_rank_k_update](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/symmetric_matrix_rank_k_update&action=edit&redlink=1> "cpp/numeric/linalg/symmetric matrix rank k update \(page does not exist\)")(C++26) | realiza uma atualização de posto k de uma matriz simétrica
(modelo de função)
[ hermitian_matrix_rank_k_update](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/hermitian_matrix_rank_k_update&action=edit&redlink=1> "cpp/numeric/linalg/hermitian matrix rank k update \(page does not exist\)")(C++26) | realiza uma atualização de posto k de uma matriz Hermitiana
(modelo de função)
[ symmetric_matrix_rank_2k_update](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/symmetric_matrix_rank_2k_update&action=edit&redlink=1> "cpp/numeric/linalg/symmetric matrix rank 2k update \(page does not exist\)")(C++26) | realiza uma atualização de posto 2k de uma matriz simétrica
(modelo de função)
[ hermitian_matrix_rank_2k_update](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/hermitian_matrix_rank_2k_update&action=edit&redlink=1> "cpp/numeric/linalg/hermitian matrix rank 2k update \(page does not exist\)")(C++26) | realiza uma atualização de posto 2k de uma matriz Hermitiana
(modelo de função)
[ triangular_matrix_matrix_left_solvetriangular_matrix_matrix_right_solve](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/linalg/triangular_matrix_matrix_solve&action=edit&redlink=1> "cpp/numeric/linalg/triangular matrix matrix solve \(page does not exist\)")(C++26) | resolve múltiplos sistemas lineares triangulares
(modelo de função)

### Sinopse
```cpp
    namespace std::linalg {
    
    // tags de ordem de armazenamento
    struct column_major_t;
    inline constexpr column_major_t column_major;
    struct row_major_t;
    inline constexpr row_major_t row_major;
    
    // tags de triângulo
    struct upper_triangle_t;
    inline constexpr upper_triangle_t upper_triangle;
    struct lower_triangle_t;
    inline constexpr lower_triangle_t lower_triangle;
    
    // tags de diagonal
    struct implicit_unit_diagonal_t;
    inline constexpr implicit_unit_diagonal_t implicit_unit_diagonal;
    struct explicit_diagonal_t;
    inline constexpr explicit_diagonal_t explicit_diagonal;
    
    // modelo de classe layout_blas_packed
    template<class Triangle, class StorageOrder>
    class layout_blas_packed;
    
    // conceitos e traits apenas para exposição
    template<class T>
    struct __is_mdspan; // exposition only
    
    template<class T>
    concept __in_vector = /* see description */; // exposition only
    
    template<class T>
    concept __out_vector = /* see description */; // exposition only
    
    template<class T>
    concept __inout_vector = /* see description */; // exposition only
    
    template<class T>
    concept __in_matrix = /* see description */; // exposition only
    
    template<class T>
    concept __out_matrix = /* see description */; // exposition only
    
    template<class T>
    concept __inout_matrix = /* see description */; // exposition only
    
    template<class T>
    concept __possibly_packed_inout_matrix = /* see description */; // exposition only
    
    template<class T>
    concept __in_object = /* see description */; // exposition only
    
    template<class T>
    concept __out_object = /* see description */; // exposition only
    
    template<class T>
    concept __inout_object = /* see description */; // exposition only
    
    // transformação in-place escalonada
    template<class ScalingFactor, class Accessor>
    class scaled_accessor;
    
    template<class ScalingFactor,
             class ElementType, class Extents, class Layout, class Accessor>
    constexpr auto scaled(ScalingFactor scaling_factor,
                          mdspan<ElementType, Extents, Layout, Accessor> x);
    
    // transformação in-place conjugada
    template<class Accessor>
    class conjugated_accessor;
    
    template<class ElementType, class Extents, class Layout, class Accessor>
    constexpr auto conjugated(mdspan<ElementType, Extents, Layout, Accessor> a);
    
    // transformação in-place transposta
    template<class Layout>
    class layout_transpose;
    
    template<class ElementType, class Extents, class Layout, class Accessor>
    constexpr auto transposed(mdspan<ElementType, Extents, Layout, Accessor> a);
    
    // transformação in-place transposta conjugada
    template<class ElementType, class Extents, class Layout, class Accessor>
    constexpr auto conjugate_transposed(mdspan<ElementType, Extents, Layout, Accessor> a);
    
    // algoritmos
    // calcula rotação de Givens
    
    template<class Real>
    struct setup_givens_rotation_result {
      Real c;
      Real s;
      Real r;
    };
    
    template<class Real>
    struct setup_givens_rotation_result<complex<Real>> {
      Real c;
      complex<Real> s;
      complex<Real> r;
    };
    
    template<class Real>
    setup_givens_rotation_result<Real> setup_givens_rotation(Real a, Real b) noexcept;
    
    template<class Real>
    setup_givens_rotation_result<complex<Real>>
    setup_givens_rotation(complex<Real> a, complex<Real> b) noexcept;
    
    // aplica rotação de Givens calculada
    template<__inout_vector InOutVec1, __inout_vector InOutVec2, class Real>
    void apply_givens_rotation(InOutVec1 x, InOutVec2 y, Real c, Real s);
    
    template<class ExecutionPolicy,
             __inout_vector InOutVec1, __inout_vector InOutVec2, class Real>
    void apply_givens_rotation(ExecutionPolicy&& exec,
                               InOutVec1 x, InOutVec2 y, Real c, Real s);
    
    template<__inout_vector InOutVec1, __inout_vector InOutVec2, class Real>
    void apply_givens_rotation(InOutVec1 x, InOutVec2 y, Real c, complex<Real> s);
    
    template<class ExecutionPolicy,
             __inout_vector InOutVec1, __inout_vector InOutVec2, class Real>
    void apply_givens_rotation(ExecutionPolicy&& exec,
                               InOutVec1 x, InOutVec2 y, Real c, complex<Real> s);
    
    // troca elementos
    template<__inout_object InOutObj1, __inout_object InOutObj2>
    void swap_elements(InOutObj1 x, InOutObj2 y);
    
    template<class ExecutionPolicy, __inout_object InOutObj1, __inout_object InOutObj2>
    void swap_elements(ExecutionPolicy&& exec, InOutObj1 x, InOutObj2 y);
    
    // multiplica elementos por escalar
    template<class Scalar, __inout_object InOutObj>
    void scale(Scalar alpha, InOutObj x);
    
    template<class ExecutionPolicy, class Scalar, __inout_object InOutObj>
    void scale(ExecutionPolicy&& exec, Scalar alpha, InOutObj x);
    
    // copia elementos
    template<__in_object InObj, __out_object OutObj>
    void copy(InObj x, OutObj y);
    
    template<class ExecutionPolicy, __in_object InObj, __out_object OutObj>
    void copy(ExecutionPolicy&& exec, InObj x, OutObj y);
    
    // adiciona elemento a elemento
    template<__in_object InObj1, __in_object InObj2, __out_object OutObj>
    void add(InObj1 x, InObj2 y, OutObj z);
    
    template<class ExecutionPolicy,
             __in_object InObj1, __in_object InObj2, __out_object OutObj>
    void add(ExecutionPolicy&& exec, InObj1 x, InObj2 y, OutObj z);
    
    // produto escalar não conjugado de dois vetores
    template<__in_vector InVec1, __in_vector InVec2, class Scalar>
    Scalar dot(InVec1 v1, InVec2 v2, Scalar init);
    
    template<class ExecutionPolicy,
             __in_vector InVec1, __in_vector InVec2, class Scalar>
    Scalar dot(ExecutionPolicy&& exec, InVec1 v1, InVec2 v2, Scalar init);
    
    template<__in_vector InVec1, __in_vector InVec2>
    auto dot(InVec1 v1, InVec2 v2) -> /* see description */;
    
    template<class ExecutionPolicy, __in_vector InVec1, __in_vector InVec2>
    auto dot(ExecutionPolicy&& exec, InVec1 v1, InVec2 v2) -> /* see description */;
    
    // produto escalar conjugado de dois vetores
    template<__in_vector InVec1, __in_vector InVec2, class Scalar>
    Scalar dotc(InVec1 v1, InVec2 v2, Scalar init);
    
    template<class ExecutionPolicy,
             __in_vector InVec1, __in_vector InVec2, class Scalar>
    Scalar dotc(ExecutionPolicy&& exec, InVec1 v1, InVec2 v2, Scalar init);
    
    template<__in_vector InVec1, __in_vector InVec2>
    auto dotc(InVec1 v1, InVec2 v2) -> /* see description */;
    
    template<class ExecutionPolicy, __in_vector InVec1, __in_vector InVec2>
    auto dotc(ExecutionPolicy&& exec, InVec1 v1, InVec2 v2) -> /* see description */;
    
    // Soma escalonada dos quadrados dos elementos de um vetor
    template<class Scalar>
    struct sum_of_squares_result {
      Scalar scaling_factor;
      Scalar scaled_sum_of_squares;
    };
    
    template<__in_vector InVec, class Scalar>
    sum_of_squares_result<Scalar>
    vector_sum_of_squares(InVec v, sum_of_squares_result<Scalar> init);
    
    template<class ExecutionPolicy, __in_vector InVec, class Scalar>
    sum_of_squares_result<Scalar>
    vector_sum_of_squares(ExecutionPolicy&& exec, InVec v,
                          sum_of_squares_result<Scalar> init);
    
    // Norma euclidiana de um vetor
    template<__in_vector InVec, class Scalar>
    Scalar vector_two_norm(InVec v, Scalar init);
    
    template<class ExecutionPolicy, __in_vector InVec, class Scalar>
    Scalar vector_two_norm(ExecutionPolicy&& exec, InVec v, Scalar init);
    
    template<__in_vector InVec>
    auto vector_two_norm(InVec v) -> /* see description */;
    
    template<class ExecutionPolicy, __in_vector InVec>
    auto vector_two_norm(ExecutionPolicy&& exec, InVec v) -> /* see description */;
    
    // soma dos valores absolutos dos elementos do vetor
    template<__in_vector InVec, class Scalar>
    Scalar vector_abs_sum(InVec v, Scalar init);
    template<class ExecutionPolicy, __in_vector InVec, class Scalar>
    Scalar vector_abs_sum(ExecutionPolicy&& exec, InVec v, Scalar init);
    
    template<__in_vector InVec>
    auto vector_abs_sum(InVec v) -> /* see description */;
    
    template<class ExecutionPolicy, __in_vector InVec>
    auto vector_abs_sum(ExecutionPolicy&& exec, InVec v) -> /* see description */;
    
    // índice do valor absoluto máximo dos elementos do vetor
    template<__in_vector InVec>
    typename InVec::extents_type vector_idx_abs_max(InVec v);
    
    template<class ExecutionPolicy, __in_vector InVec>
    typename InVec::extents_type vector_idx_abs_max(ExecutionPolicy&& exec, InVec v);
    
    // Norma de Frobenius de uma matriz
    template<__in_matrix InMat, class Scalar>
    Scalar matrix_frob_norm(InMat A, Scalar init);
    
    template<class ExecutionPolicy, __in_matrix InMat, class Scalar>
    Scalar matrix_frob_norm(ExecutionPolicy&& exec,
                            InMat A, Scalar init);
    
    template<__in_matrix InMat>
    auto matrix_frob_norm(InMat A) -> /* see description */;
    
    template<class ExecutionPolicy, __in_matrix InMat>
    auto matrix_frob_norm(ExecutionPolicy&& exec, InMat A) -> /* see description */;
    
    // Norma um de uma matriz
    template<__in_matrix InMat, class Scalar>
    Scalar matrix_one_norm(InMat A, Scalar init);
    
    template<class ExecutionPolicy, __in_matrix InMat, class Scalar>
    Scalar matrix_one_norm(ExecutionPolicy&& exec,
                           InMat A, Scalar init);
    
    template<__in_matrix InMat>
    auto matrix_one_norm(InMat A) -> /* see description */;
    
    template<class ExecutionPolicy, __in_matrix InMat>
    auto matrix_one_norm(ExecutionPolicy&& exec, InMat A) -> /* see description */;
    
    // Norma infinito de uma matriz
    template<__in_matrix InMat, class Scalar>
    Scalar matrix_inf_norm(InMat A, Scalar init);
    
    template<class ExecutionPolicy, __in_matrix InMat, class Scalar>
    Scalar matrix_inf_norm(ExecutionPolicy&& exec,
                           InMat A, Scalar init);
    
    template<__in_matrix InMat>
    auto matrix_inf_norm(InMat A) -> /* see description */;
    
    template<class ExecutionPolicy, __in_matrix InMat>
    auto matrix_inf_norm(ExecutionPolicy&& exec, InMat A) -> /* see description */;
    
    // produto matriz-vetor geral
    template<__in_matrix InMat, __in_vector InVec, __out_vector OutVec>
    void matrix_vector_product(InMat A, InVec x, OutVec y);
    
    template<class ExecutionPolicy,
             __in_matrix InMat, __in_vector InVec, __out_vector OutVec>
    void matrix_vector_product(ExecutionPolicy&& exec,
                               InMat A, InVec x, OutVec y);
    
    template<__in_matrix InMat, __in_vector InVec1,
             __in_vector InVec2, __out_vector OutVec>
    void matrix_vector_product(InMat A, InVec1 x, InVec2 y, OutVec z);
    
    template<class ExecutionPolicy,
             __in_matrix InMat, __in_vector InVec1,
             __in_vector InVec2, __out_vector OutVec>
    void matrix_vector_product(ExecutionPolicy&& exec,
                               InMat A, InVec1 x, InVec2 y, OutVec z);
    
    // produto matriz-vetor simétrico
    template<__in_matrix InMat, class Triangle,
             __in_vector InVec, __out_vector OutVec>
    void symmetric_matrix_vector_product(InMat A, Triangle t,
                                         InVec x, OutVec y);
    
    template<class ExecutionPolicy,
             __in_matrix InMat, class Triangle,
             __in_vector InVec, __out_vector OutVec>
    void symmetric_matrix_vector_product(ExecutionPolicy&& exec,
                                         InMat A, Triangle t,
                                         InVec x, OutVec y);
    
    template<__in_matrix InMat, class Triangle,
             __in_vector InVec1, __in_vector InVec2,
             __out_vector OutVec>
    void symmetric_matrix_vector_product(InMat A, Triangle t,
                                         InVec1 x, InVec2 y, OutVec z);
    
    template<class ExecutionPolicy,
             __in_matrix InMat, class Triangle,
             __in_vector InVec1, __in_vector InVec2,
             __out_vector OutVec>
    void symmetric_matrix_vector_product(ExecutionPolicy&& exec,
                                         InMat A, Triangle t,
                                         InVec1 x, InVec2 y, OutVec z);
    
    // produto matriz-vetor Hermitiano
    template<__in_matrix InMat, class Triangle,
             __in_vector InVec, __out_vector OutVec>
    void hermitian_matrix_vector_product(InMat A, Triangle t,
                                         InVec x, OutVec y);
    
    template<class ExecutionPolicy,
             __in_matrix InMat, class Triangle,
             __in_vector InVec, __out_vector OutVec>
    void hermitian_matrix_vector_product(ExecutionPolicy&& exec,
                                         InMat A, Triangle t,
                                         InVec x, OutVec y);
    
    template<__in_matrix InMat, class Triangle,
             __in_vector InVec1, __in_vector InVec2,
             __out_vector OutVec>
    void hermitian_matrix_vector_product(InMat A, Triangle t,
                                         InVec1 x, InVec2 y, OutVec z);
    
    template<class ExecutionPolicy,
             __in_matrix InMat, class Triangle,
             __in_vector InVec1, __in_vector InVec2,
             __out_vector OutVec>
    void hermitian_matrix_vector_product(ExecutionPolicy&& exec,
                                         InMat A, Triangle t,
                                         InVec1 x, InVec2 y, OutVec z);
    
    // Produto matriz-vetor triangular
    // Produto matriz-vetor triangular com sobrescrita
    template<__in_matrix InMat, class Triangle, class DiagonalStorage,
             __in_vector InVec, __out_vector OutVec>
    void triangular_matrix_vector_product(InMat A, Triangle t, DiagonalStorage d,
                                          InVec x, OutVec y);
    
    template<class ExecutionPolicy,
             __in_matrix InMat, class Triangle, class DiagonalStorage,
             __in_vector InVec, __out_vector OutVec>
    void triangular_matrix_vector_product(ExecutionPolicy&& exec,
                                          InMat A, Triangle t, DiagonalStorage d,
                                          InVec x, OutVec y);
    
    // Produto matriz-vetor triangular in-place
    template<__in_matrix InMat, class Triangle, class DiagonalStorage,
             __inout_vector InOutVec>
    void triangular_matrix_vector_product(InMat A, Triangle t, DiagonalStorage d,
                                          InOutVec y);
    
    template<class ExecutionPolicy,
             __in_matrix InMat, class Triangle, class DiagonalStorage,
             __inout_vector InOutVec>
    void triangular_matrix_vector_product(ExecutionPolicy&& exec,
                                          InMat A, Triangle t, DiagonalStorage d,
                                          InOutVec y);
    
    // Atualizando produto matriz-vetor triangular
    template<__in_matrix InMat, class Triangle, class DiagonalStorage,
             __in_vector InVec1, __in_vector InVec2,
             __out_vector OutVec>
    void triangular_matrix_vector_product(InMat A, Triangle t, DiagonalStorage d,
                                          InVec1 x, InVec2 y, OutVec z);
    
    template<class ExecutionPolicy,
             __in_matrix InMat, class Triangle, class DiagonalStorage,
             __in_vector InVec1, __in_vector InVec2,
             __out_vector OutVec>
    void triangular_matrix_vector_product(ExecutionPolicy&& exec,
                                          InMat A, Triangle t, DiagonalStorage d,
                                          InVec1 x, InVec2 y, OutVec z);
    
    // Resolve um sistema linear triangular, não in-place
    template<__in_matrix InMat, class Triangle, class DiagonalStorage,
             __in_vector InVec, __out_vector OutVec, class BinaryDivideOp>
    void triangular_matrix_vector_solve(InMat A, Triangle t, DiagonalStorage d,
                                        InVec b, OutVec x, BinaryDivideOp divide);
    
    template<class ExecutionPolicy,
             __in_matrix InMat, class Triangle, class DiagonalStorage,
             __in_vector InVec, __out_vector OutVec, class BinaryDivideOp>
    void triangular_matrix_vector_solve(ExecutionPolicy&& exec,
                                        InMat A, Triangle t, DiagonalStorage d,
                                        InVec b, OutVec x, BinaryDivideOp divide);
    
    template<__in_matrix InMat, class Triangle, class DiagonalStorage,
             __in_vector InVec, __out_vector OutVec>
    void triangular_matrix_vector_solve(InMat A, Triangle t, DiagonalStorage d,
                                        InVec b, OutVec x);
    
    template<class ExecutionPolicy,
             __in_matrix InMat, class Triangle, class DiagonalStorage,
             __in_vector InVec, __out_vector OutVec>
    void triangular_matrix_vector_solve(ExecutionPolicy&& exec,
                                        InMat A, Triangle t, DiagonalStorage d,
                                        InVec b, OutVec x);
    
    // Resolve um sistema linear triangular, in-place
    template<__in_matrix InMat, class Triangle, class DiagonalStorage,
             __inout_vector InOutVec, class BinaryDivideOp>
    void triangular_matrix_vector_solve(InMat A, Triangle t, DiagonalStorage d,
                                        InOutVec b, BinaryDivideOp divide);
    
    template<class ExecutionPolicy,
             __in_matrix InMat, class Triangle, class DiagonalStorage,
             __inout_vector InOutVec, class BinaryDivideOp>
```
```cpp
    void triangular_matrix_vector_solve(ExecutionPolicy&& exec,
                                        InMat A, Triangle t, DiagonalStorage d,
                                        InOutVec b, BinaryDivideOp divide);
     
    template<__in_matrix InMat, class Triangle, class DiagonalStorage,
             __inout_vector InOutVec>
    void triangular_matrix_vector_solve(InMat A, Triangle t, DiagonalStorage d,
                                        InOutVec b);
     
    template<class ExecutionPolicy,
             __in_matrix InMat, class Triangle, class DiagonalStorage,
             __inout_vector InOutVec>
    void triangular_matrix_vector_solve(ExecutionPolicy&& exec,
                                        InMat A, Triangle t, DiagonalStorage d,
                                        InOutVec b);
     
    // atualização de matriz de posto 1 não conjugada
    template<__in_vector InVec1, __in_vector InVec2, __inout_matrix InOutMat>
    void matrix_rank_1_update(InVec1 x, InVec2 y, InOutMat A);
     
    template<class ExecutionPolicy,
             __in_vector InVec1, __in_vector InVec2, __inout_matrix InOutMat>
    void matrix_rank_1_update(ExecutionPolicy&& exec,
                              InVec1 x, InVec2 y, InOutMat A);
     
    // atualização de matriz de posto 1 conjugada
    template<__in_vector InVec1, __in_vector InVec2, __inout_matrix InOutMat>
    void matrix_rank_1_update_c(InVec1 x, InVec2 y, InOutMat A);
     
    template<class ExecutionPolicy, 
             __in_vector InVec1, __in_vector InVec2, __inout_matrix InOutMat>
    void matrix_rank_1_update_c(ExecutionPolicy&& exec,
                                InVec1 x, InVec2 y, InOutMat A);
     
    // atualização de matriz simétrica de posto 1
    template<__in_vector InVec, __possibly_packed_inout_matrix InOutMat,
             class Triangle>
    void symmetric_matrix_rank_1_update(InVec x, InOutMat A, Triangle t);
     
    template<class ExecutionPolicy,
             __in_vector InVec, __possibly_packed_inout_matrix InOutMat,
             class Triangle>
    void symmetric_matrix_rank_1_update(ExecutionPolicy&& exec,
                                        InVec x, InOutMat A, Triangle t);
     
    template<class Scalar, __in_vector InVec,
             __possibly_packed_inout_matrix InOutMat, class Triangle>
    void symmetric_matrix_rank_1_update(Scalar alpha, InVec x, InOutMat A,
                                        Triangle t);
     
    template<class ExecutionPolicy,
             class Scalar, __in_vector InVec,
             __possibly_packed_inout_matrix InOutMat, class Triangle>
    void symmetric_matrix_rank_1_update(ExecutionPolicy&& exec,
                                        Scalar alpha, InVec x, InOutMat A,
                                        Triangle t);
     
    // atualização de matriz Hermitiana de posto 1
    template<__in_vector InVec, __possibly_packed_inout_matrix InOutMat,
             class Triangle>
    void hermitian_matrix_rank_1_update(InVec x, InOutMat A, Triangle t);
     
    template<class ExecutionPolicy,
             __in_vector InVec, __possibly_packed_inout_matrix InOutMat,
             class Triangle>
    void hermitian_matrix_rank_1_update(ExecutionPolicy&& exec,
                                        InVec x, InOutMat A, Triangle t);
     
    template<class Scalar, __in_vector InVec,
             __possibly_packed_inout_matrix InOutMat,
             class Triangle>
    void hermitian_matrix_rank_1_update(Scalar alpha, InVec x, InOutMat A,
                                        Triangle t);
     
    template<class ExecutionPolicy,
             class Scalar, __in_vector InVec,
             __possibly_packed_inout_matrix InOutMat,
             class Triangle>
    void hermitian_matrix_rank_1_update(ExecutionPolicy&& exec,
                                        Scalar alpha, InVec x, InOutMat A,
                                        Triangle t);
     
    // atualização de matriz simétrica de posto 2
    template<__in_vector InVec1, __in_vector InVec2,
             __possibly_packed_inout_matrix InOutMat,
             class Triangle>
    void symmetric_matrix_rank_2_update(InVec1 x, InVec2 y, InOutMat A,
                                        Triangle t);
     
    template<class ExecutionPolicy,
             __in_vector InVec1, __in_vector InVec2,
             __possibly_packed_inout_matrix InOutMat,
             class Triangle>
    void symmetric_matrix_rank_2_update(ExecutionPolicy&& exec,
                                        InVec1 x, InVec2 y, InOutMat A,
                                        Triangle t);
     
    // atualização de matriz Hermitiana de posto 2
    template<__in_vector InVec1, __in_vector InVec2,
             __possibly_packed_inout_matrix InOutMat,
             class Triangle>
    void hermitian_matrix_rank_2_update(InVec1 x, InVec2 y, InOutMat A,
                                        Triangle t);
     
    template<class ExecutionPolicy,
             __in_vector InVec1, __in_vector InVec2,
             __possibly_packed_inout_matrix InOutMat,
             class Triangle>
    void hermitian_matrix_rank_2_update(ExecutionPolicy&& exec,
                                        InVec1 x, InVec2 y, InOutMat A,
                                        Triangle t);
     
    // produto geral matriz-matriz
    template<__in_matrix InMat1, __in_matrix InMat2, __out_matrix OutMat>
    void matrix_product(InMat1 A, InMat2 B, OutMat C);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, __in_matrix InMat2, __out_matrix OutMat>
    void matrix_product(ExecutionPolicy&& exec, InMat1 A, InMat2 B, OutMat C);
     
    template<__in_matrix InMat1, __in_matrix InMat2, __in_matrix InMat3,
             __out_matrix OutMat>
    void matrix_product(InMat1 A, InMat2 B, InMat3 E, OutMat C);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, __in_matrix InMat2, __in_matrix InMat3,
             __out_matrix OutMat>
    void matrix_product(ExecutionPolicy&& exec,
                        InMat1 A, InMat2 B, InMat3 E, OutMat C);
     
     
    // produto matriz-matriz simétrico
    // sobrescrevendo produto matriz-matriz simétrico à esquerda
    template<__in_matrix InMat1, class Triangle,
             __in_matrix InMat2, __out_matrix OutMat>
    void symmetric_matrix_product(InMat1 A, Triangle t,
                                  InMat2 B, OutMat C);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, class Triangle,
             __in_matrix InMat2, __out_matrix OutMat>
    void symmetric_matrix_product(ExecutionPolicy&& exec,
                                  InMat1 A, Triangle t,
                                  InMat2 B, OutMat C);
     
    // sobrescrevendo produto matriz-matriz simétrico à direita
    template<__in_matrix InMat1, __in_matrix InMat2,
             class Triangle, __out_matrix OutMat>
    void symmetric_matrix_product(InMat1 B, InMat2 A, Triangle t,
                                  OutMat C);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, __in_matrix InMat2,
             class Triangle, __out_matrix OutMat>
    void symmetric_matrix_product(ExecutionPolicy&& exec,
                                  InMat1 B, InMat2 A, Triangle t,
                                  OutMat C);
     
    // atualizando produto matriz-matriz simétrico à esquerda
    template<__in_matrix InMat1, class Triangle,
             __in_matrix InMat2, __in_matrix InMat3,
             __out_matrix OutMat>
    void symmetric_matrix_product(InMat1 A, Triangle t,
                                  InMat2 B, InMat3 E,
                                  OutMat C);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, class Triangle,
             __in_matrix InMat2, __in_matrix InMat3,
             __out_matrix OutMat>
    void symmetric_matrix_product(ExecutionPolicy&& exec,
                                  InMat1 A, Triangle t,
                                  InMat2 B, InMat3 E,
                                  OutMat C);
     
    // atualizando produto matriz-matriz simétrico à direita
    template<__in_matrix InMat1, __in_matrix InMat2, class Triangle,
             __in_matrix InMat3, __out_matrix OutMat>
    void symmetric_matrix_product(InMat1 B, InMat2 A, Triangle t,
                                  InMat3 E, OutMat C);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, __in_matrix InMat2, class Triangle,
             __in_matrix InMat3, __out_matrix OutMat>
    void symmetric_matrix_product(ExecutionPolicy&& exec,
                                  InMat1 B, InMat2 A, Triangle t,
                                  InMat3 E, OutMat C);
     
    // produto matriz-matriz Hermitiano
    // sobrescrevendo produto matriz-matriz Hermitiano à esquerda
    template<__in_matrix InMat1, class Triangle,
             __in_matrix InMat2, __out_matrix OutMat>
    void hermitian_matrix_product(InMat1 A, Triangle t,
                                  InMat2 B, OutMat C);
    template<class ExecutionPolicy,
             __in_matrix InMat1, class Triangle,
             __in_matrix InMat2, __out_matrix OutMat>
    void hermitian_matrix_product(ExecutionPolicy&& exec,
                                  InMat1 A, Triangle t,
                                  InMat2 B, OutMat C);
     
    // sobrescrevendo produto matriz-matriz Hermitiano à direita
    template<__in_matrix InMat1, __in_matrix InMat2,
             class Triangle, __out_matrix OutMat>
    void hermitian_matrix_product(InMat1 B, InMat2 A, Triangle t,
                                  OutMat C);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, __in_matrix InMat2,
             class Triangle, __out_matrix OutMat>
    void hermitian_matrix_product(ExecutionPolicy&& exec,
                                  InMat1 B, InMat2 A, Triangle t,
                                  OutMat C);
     
    // atualizando produto matriz-matriz Hermitiano à esquerda
    template<__in_matrix InMat1, class Triangle,
             __in_matrix InMat2, __in_matrix InMat3, __out_matrix OutMat>
    void hermitian_matrix_product(InMat1 A, Triangle t,
                                  InMat2 B, InMat3 E, OutMat C);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, class Triangle,
             __in_matrix InMat2, __in_matrix InMat3, __out_matrix OutMat>
    void hermitian_matrix_product(ExecutionPolicy&& exec,
                                  InMat1 A, Triangle t,
                                  InMat2 B, InMat3 E, OutMat C);
     
    // atualizando produto matriz-matriz Hermitiano à direita
    template<__in_matrix InMat1, __in_matrix InMat2, class Triangle,
             __in_matrix InMat3, __out_matrix OutMat>
    void hermitian_matrix_product(InMat1 B, InMat2 A, Triangle t,
                                  InMat3 E, OutMat C);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, __in_matrix InMat2, class Triangle,
             __in_matrix InMat3, __out_matrix OutMat>
    void hermitian_matrix_product(ExecutionPolicy&& exec,
                                  InMat1 B, InMat2 A, Triangle t,
                                  InMat3 E, OutMat C);
     
    // produto matriz-matriz triangular
    // sobrescrevendo produto matriz-matriz triangular à esquerda
    template<__in_matrix InMat1, class Triangle, class DiagonalStorage,
             __in_matrix InMat2, __out_matrix OutMat>
    void triangular_matrix_product(InMat1 A, Triangle t, DiagonalStorage d,
                                   InMat2 B, OutMat C);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, class Triangle, class DiagonalStorage,
             __in_matrix InMat2, __out_matrix OutMat>
    void triangular_matrix_product(ExecutionPolicy&& exec,
                                   InMat1 A, Triangle t, DiagonalStorage d,
                                   InMat2 B, OutMat C);
     
    template<__in_matrix InMat1, class Triangle, class DiagonalStorage,
             __inout_matrix InOutMat>
    void triangular_matrix_left_product(InMat1 A, Triangle t, DiagonalStorage d,
                                        InOutMat C);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, class Triangle, class DiagonalStorage,
             __inout_matrix InOutMat>
    void triangular_matrix_left_product(ExecutionPolicy&& exec,
                                        InMat1 A, Triangle t, DiagonalStorage d,
                                        InOutMat C);
     
    // sobrescrevendo produto matriz-matriz triangular à direita
    template<__in_matrix InMat1, __in_matrix InMat2,
             class Triangle, class DiagonalStorage,
             __out_matrix OutMat>
    void triangular_matrix_product(InMat1 B, InMat2 A,
                                   Triangle t, DiagonalStorage d,
                                   OutMat C);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, __in_matrix InMat2,
             class Triangle, class DiagonalStorage,
             __out_matrix OutMat>
    void triangular_matrix_product(ExecutionPolicy&& exec,
                                   InMat1 B, InMat2 A,
                                   Triangle t, DiagonalStorage d,
                                   OutMat C);
     
    template<__in_matrix InMat1, class Triangle, class DiagonalStorage,
             __inout_matrix InOutMat>
    void triangular_matrix_right_product(InMat1 A, Triangle t, DiagonalStorage d,
                                         InOutMat C);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, class Triangle, class DiagonalStorage,
             __inout_matrix InOutMat>
    void triangular_matrix_right_product(ExecutionPolicy&& exec,
                                         InMat1 A, Triangle t, DiagonalStorage d,
                                         InOutMat C);
     
    // atualizando produto matriz-matriz triangular à esquerda
    template<__in_matrix InMat1, class Triangle, class DiagonalStorage,
             __in_matrix InMat2, __in_matrix InMat3,
             __out_matrix OutMat>
    void triangular_matrix_product(InMat1 A, Triangle t, DiagonalStorage d,
                                   InMat2 B, InMat3 E, OutMat C);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, class Triangle, class DiagonalStorage,
             __in_matrix InMat2, __in_matrix InMat3,
             __out_matrix OutMat>
    void triangular_matrix_product(ExecutionPolicy&& exec,
                                   InMat1 A, Triangle t, DiagonalStorage d,
                                   InMat2 B, InMat3 E, OutMat C);
     
    // atualizando produto matriz-matriz triangular à direita
    template<__in_matrix InMat1, __in_matrix InMat2,
             class Triangle, class DiagonalStorage,
             __in_matrix InMat3, __out_matrix OutMat>
    void triangular_matrix_product(InMat1 B, InMat2 A,
                                   Triangle t, DiagonalStorage d,
                                   InMat3 E, OutMat C);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, __in_matrix InMat2,
             class Triangle, class DiagonalStorage,
             __in_matrix InMat3, __out_matrix OutMat>
    void triangular_matrix_product(ExecutionPolicy&& exec,
                                   InMat1 B, InMat2 A,
                                   Triangle t, DiagonalStorage d,
                                   InMat3 E, OutMat C);
     
    // atualização de matriz simétrica de posto k
    template<class Scalar, __in_matrix InMat1,
             __possibly_packed_inout_matrix InOutMat, class Triangle>
    void symmetric_matrix_rank_k_update(Scalar alpha, InMat1 A, InOutMat C,
                                        Triangle t);
     
    template<class Scalar,
             class ExecutionPolicy,
             ___in_matrix InMat1,
             __possibly_packed_inout_matrix InOutMat, class Triangle>
    void symmetric_matrix_rank_k_update(ExecutionPolicy&& exec,
                                        Scalar alpha, InMat1 A, InOutMat C,
                                        Triangle t);
     
    template<__in_matrix InMat1,
             __possibly_packed_inout_matrix InOutMat, class Triangle>
    void symmetric_matrix_rank_k_update(InMat1 A, InOutMat C, Triangle t);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1,
             __possibly_packed_inout_matrix InOutMat, class Triangle>
    void symmetric_matrix_rank_k_update(ExecutionPolicy&& exec,
                                        InMat1 A, InOutMat C, Triangle t);
     
    // atualização de matriz Hermitiana de posto k
    template<class Scalar, __in_matrix InMat1,
             __possibly_packed_inout_matrix InOutMat, class Triangle>
    void hermitian_matrix_rank_k_update(Scalar alpha, InMat1 A, InOutMat C,
                                        Triangle t);
     
    template<class ExecutionPolicy,
             class Scalar, __in_matrix InMat1,
             __possibly_packed_inout_matrix InOutMat, class Triangle
    void hermitian_matrix_rank_k_update(ExecutionPolicy&& exec,
                                        Scalar alpha, InMat1 A, InOutMat C,
                                        Triangle t);
     
    template<__in_matrix InMat1,
             __possibly_packed_inout_matrix InOutMat, class Triangle>
    void hermitian_matrix_rank_k_update(InMat1 A, InOutMat C, Triangle t);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1,
             __possibly_packed_inout_matrix InOutMat, class Triangle>
    void hermitian_matrix_rank_k_update(ExecutionPolicy&& exec,
                                        InMat1 A, InOutMat C, Triangle t);
     
    // atualização de matriz simétrica de posto 2k
    template<__in_matrix InMat1, __in_matrix InMat2,
             __possibly_packed_inout_matrix InOutMat, class Triangle>
    void symmetric_matrix_rank_2k_update(InMat1 A, InMat2 B, InOutMat C,
                                         Triangle t);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, __in_matrix InMat2,
             __possibly_packed_inout_matrix InOutMat, class Triangle>
    void symmetric_matrix_rank_2k_update(ExecutionPolicy&& exec,
                                         InMat1 A, InMat2 B, InOutMat C,
                                         Triangle t);
     
    // atualização de matriz Hermitiana de posto 2k
    template<__in_matrix InMat1, __in_matrix InMat2,
             __possibly_packed_inout_matrix InOutMat, class Triangle>
    void hermitian_matrix_rank_2k_update(InMat1 A, InMat2 B, InOutMat C,
                                         Triangle t);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, __in_matrix InMat2,
             __possibly_packed_inout_matrix InOutMat, class Triangle>
    void hermitian_matrix_rank_2k_update(ExecutionPolicy&& exec,
                                         InMat1 A, InMat2 B, InOutMat C,
                                         Triangle t);
     
    // resolve múltiplos sistemas lineares triangulares
    // com matriz triangular à esquerda
    template<__in_matrix InMat1, class Triangle, class DiagonalStorage,
             __in_matrix InMat2, __out_matrix OutMat, class BinaryDivideOp>
    void triangular_matrix_matrix_left_solve(InMat1 A,
                                             Triangle t, DiagonalStorage d,
                                             InMat2 B, OutMat X,
                                             BinaryDivideOp divide);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, class Triangle, class DiagonalStorage,
             __in_matrix InMat2, __out_matrix OutMat, class BinaryDivideOp>
    void triangular_matrix_matrix_left_solve(ExecutionPolicy&& exec,
                                             InMat1 A,
                                             Triangle t, DiagonalStorage d,
                                             InMat2 B, OutMat X,
                                             BinaryDivideOp divide);
     
    template<__in_matrix InMat1, class Triangle, class DiagonalStorage,
             __inout_matrix InOutMat, class BinaryDivideOp>
    void triangular_matrix_matrix_left_solve(InMat1 A, Triangle t, DiagonalStorage d,
                                             InOutMat B, BinaryDivideOp divide);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, class Triangle, class DiagonalStorage,
             __inout_matrix InOutMat, class BinaryDivideOp>
    void triangular_matrix_matrix_left_solve(ExecutionPolicy&& exec,
                                             InMat1 A, Triangle t, DiagonalStorage d,
                                             InOutMat B, BinaryDivideOp divide);
     
    template<__in_matrix InMat1, class Triangle, class DiagonalStorage,
             __in_matrix InMat2, __out_matrix OutMat>
    void triangular_matrix_matrix_left_solve(InMat1 A, Triangle t, DiagonalStorage d,
                                             InMat2 B, OutMat X);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, class Triangle, class DiagonalStorage,
             __in_matrix InMat2, __out_matrix OutMat>
    void triangular_matrix_matrix_left_solve(ExecutionPolicy&& exec,
                                             InMat1 A, Triangle t, DiagonalStorage d,
                                             InMat2 B, OutMat X);
     
    template<__in_matrix InMat1, class Triangle, class DiagonalStorage,
             __inout_matrix InOutMat>
    void triangular_matrix_matrix_left_solve(InMat1 A, Triangle t, DiagonalStorage d,
                                             InOutMat B);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, class Triangle, class DiagonalStorage,
             __inout_matrix InOutMat>
    void triangular_matrix_matrix_left_solve(ExecutionPolicy&& exec,
                                             InMat1 A, Triangle t, DiagonalStorage d,
                                             InOutMat B);
     
    // resolve múltiplos sistemas lineares triangulares
    // com matriz triangular à direita
    template<__in_matrix InMat1, class Triangle, class DiagonalStorage,
             __in_matrix InMat2, __out_matrix OutMat, class BinaryDivideOp>
    void triangular_matrix_matrix_right_solve(InMat1 A, Triangle t, DiagonalStorage d,
                                              InMat2 B, OutMat X, BinaryDivideOp divide);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, class Triangle, class DiagonalStorage,
             __in_matrix InMat2, __out_matrix OutMat, class BinaryDivideOp>
    void triangular_matrix_matrix_right_solve(ExecutionPolicy&& exec,
                                              InMat1 A, Triangle t, DiagonalStorage d,
                                              InMat2 B, OutMat X, BinaryDivideOp divide);
     
    template<__in_matrix InMat1, class Triangle, class DiagonalStorage,
             __inout_matrix InOutMat, class BinaryDivideOp>
    void triangular_matrix_matrix_right_solve(InMat1 A, Triangle t, DiagonalStorage d,
                                              InOutMat B, BinaryDivideOp divide);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, class Triangle, class DiagonalStorage,
             __inout_matrix InOutMat, class BinaryDivideOp>
    void triangular_matrix_matrix_right_solve(ExecutionPolicy&& exec,
                                              InMat1 A, Triangle t, DiagonalStorage d,
                                              InOutMat B, BinaryDivideOp divide));
     
    template<__in_matrix InMat1, class Triangle, class DiagonalStorage,
             __in_matrix InMat2, __out_matrix OutMat>
    void triangular_matrix_matrix_right_solve(InMat1 A, Triangle t, DiagonalStorage d,
                                              InMat2 B, OutMat X);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, class Triangle, class DiagonalStorage,
             __in_matrix InMat2, __out_matrix OutMat>
    void triangular_matrix_matrix_right_solve(ExecutionPolicy&& exec,
                                              InMat1 A, Triangle t, DiagonalStorage d,
                                              InMat2 B, OutMat X);
     
    template<__in_matrix InMat1, class Triangle, class DiagonalStorage,
             __inout_matrix InOutMat>
    void triangular_matrix_matrix_right_solve(InMat1 A, Triangle t, DiagonalStorage d,
                                              InOutMat B);
     
    template<class ExecutionPolicy,
             __in_matrix InMat1, class Triangle, class DiagonalStorage,
             __inout_matrix InOutMat>
    void triangular_matrix_matrix_right_solve(ExecutionPolicy&& exec,
                                              InMat1 A, Triangle t, DiagonalStorage d,
                                              InOutMat B);
    }
```

#### Tags
```cpp
    namespace std::linalg {
      struct column_major_t {
        explicit column_major_t() = default;
      };
      inline constexpr column_major_t column_major = { };
     
      struct row_major_t {
        explicit row_major_t() = default;
      };
      inline constexpr row_major_t row_major = { };
     
      struct upper_triangle_t {
        explicit upper_triangle_t() = default;
      };
      inline constexpr upper_triangle_t upper_triangle = { };
     
      struct lower_triangle_t {
        explicit lower_triangle_t() = default;
      };
      inline constexpr lower_triangle_t lower_triangle = { };
     
      struct implicit_unit_diagonal_t {
        explicit implicit_unit_diagonal_t() = default;
      };
      inline constexpr implicit_unit_diagonal_t implicit_unit_diagonal = { };
     
      struct explicit_diagonal_t {
        explicit explicit_diagonal_t() = default;
      };
      inline constexpr explicit_diagonal_t explicit_diagonal = { };
    }
```

#### Modelo de classe std::linalg::layout_blas_packed
```cpp
    namespace std::linalg {
      template<class Triangle, class StorageOrder>
      class layout_blas_packed {
       public:
        using triangle_type = Triangle;
        using storage_order_type = StorageOrder;
     
        template<class Extents>
        struct mapping {
         public:
          using extents_type = Extents;
          using index_type = typename extents_type::index_type;
          using size_type = typename extents_type::size_type;
          using rank_type = typename extents_type::rank_type;
          using layout_type = layout_blas_packed<Triangle, StorageOrder>;
     
         private:
          Extents __the_extents{}; // apenas para exposição
     
         public:
          constexpr mapping() noexcept = default;
          constexpr mapping(const mapping&) noexcept = default;
          constexpr mapping(const extents_type& e) noexcept;
          template<class OtherExtents>
          constexpr explicit(!is_convertible_v<OtherExtents, extents_type>)
          mapping(const mapping<OtherExtents>& other) noexcept;
     
          constexpr mapping& operator=(const mapping&) noexcept = default;
     
          constexpr extents_type extents() const noexcept { return __the_extents; }
     
          constexpr size_type required_span_size() const noexcept;
     
          template<class Index0, class Index1>
          constexpr index_type operator() (Index0 ind0, Index1 ind1) const noexcept;
     
          static constexpr bool is_always_unique() {
            return (extents_type::static_extent(0) != dynamic_extent &&
                    extents_type::static_extent(0) < 2) ||
                   (extents_type::static_extent(1) != dynamic_extent &&
                    extents_type::static_extent(1) < 2);
          }
          static constexpr bool is_always_exhaustive() { return true; }
          static constexpr bool is_always_strided() {
            return is_always_unique();
          }
     
          constexpr bool is_unique() const noexcept {
            return __the_extents.extent(0) < 2;
          }
          constexpr bool is_exhaustive() const noexcept { return true; }
          constexpr bool is_strided() const noexcept {
            return __the_extents.extent(0) < 2;
          }
     
          constexpr index_type stride(rank_type) const noexcept;
     
          template<class OtherExtents>
          friend constexpr bool
          operator==(const mapping&, const mapping<OtherExtents>&) noexcept;
     
        };
      };
    }
```

#### Modelo de classe std::linalg::scaled_accessor
```cpp
    namespace std::linalg {
      template<class ScalingFactor, class NestedAccessor>
      class scaled_accessor {
       public:
        using element_type = 
          add_const_t<decltype(declval<ScalingFactor>() * 
                               declval<NestedAccessor::element_type>())>;
        using reference = remove_const_t<element_type>;
        using data_handle_type = NestedAccessor::data_handle_type;
        using offset_policy = scaled_accessor<ScalingFactor, NestedAccessor::offset_policy>;
     
        constexpr scaled_accessor() = default;
        template<class OtherNestedAccessor>
          explicit(!is_convertible_v<OtherNestedAccessor, NestedAccessor>)
        constexpr scaled_accessor(const scaled_accessor<ScalingFactor, OtherNestedAccessor>&);
        constexpr scaled_accessor(const ScalingFactor& s, const Accessor& a);
     
        constexpr reference access(data_handle_type p, size_t i) const noexcept;
        constexpr 
          offset_policy::data_handle_type offset(data_handle_type p, size_t i) const noexcept;
     
        constexpr const ScalingFactor& scaling_factor() const noexcept 
          { return __scaling_factor; } 
        constexpr const NestedAccessor& nested_accessor() const noexcept
          { return __nested_accessor; }
     
       private:
        ScalingFactor __scaling_factor; // apenas para exposição
        NestedAccessor __nested_accessor; // apenas para exposição
      };
    }
```

#### Modelo de classe std::linalg::conjugated_accessor
```cpp
    namespace std::linalg {
      template<class NestedAccessor>
      class conjugated_accessor {
       private:
        NestedAccessor __nested_accessor; // apenas para exposição
     
       public:
        using element_type =
          add_const_t<decltype(/*conj-se-necessário*/(declval<NestedAccessor::element_type>()))>;
        using reference = remove_const_t<element_type>;
        using data_handle_type = typename NestedAccessor::data_handle_type;
        using offset_policy = conjugated_accessor<NestedAccessor::offset_policy>;
     
        constexpr conjugated_accessor() = default;
        template<class OtherNestedAccessor>
          explicit(!is_convertible_v<OtherNestedAccessor, NestedAccessor>)
          constexpr conjugated_accessor(const conjugated_accessor<OtherNestedAccessor>& other);
     
        constexpr reference access(data_handle_type p, size_t i) const;
     
        constexpr typename offset_policy::data_handle_type
          offset(data_handle_type p, size_t i) const;
     
        constexpr const NestedAccessor& nested_accessor() const noexcept
          { return __nested_accessor; }
      };
    }
```

#### Modelo de classe std::linalg::layout_transpose
```cpp
    namespace std::linalg {
      template<class InputExtents>
      using __transpose_extents_t = /* veja a descrição */; // apenas para exposição
     
      template<class Layout>
      class layout_transpose {
       public:
        using nested_layout_type = Layout;
     
        template<class Extents>
        struct mapping {
         private:
          using __nested_mapping_type =
            typename Layout::template mapping<
              __transpose_extents_t<Extents>>;    // apenas para exposição
     
          __nested_mapping_type __nested_mapping; // apenas para exposição
            extents_type __extents;               // apenas para exposição
     
         public:
          using extents_type = Extents;
          using index_type = typename extents_type::index_type;
          using size_type = typename extents_type::size_type;
          using rank_type = typename extents_type::rank_type;
          using layout_type = layout_transpose;
     
          constexpr explicit mapping(const __nested_mapping_type& map);
     
          constexpr const extents_type& extents() const noexcept { return __extents; }
```
```cpp
          constexpr index_type required_span_size() const
            { return __nested_mapping.required_span_size(); }
     
          template<class Index0, class Index1>
            constexpr index_type operator()(Index0 ind0, Index1 ind1) const
            { return __nested_mapping(ind1, ind0); }
     
          constexpr const __nested_mapping_type& nested_mapping() const noexcept
            { return __nested_mapping; }
     
          static constexpr bool is_always_unique() noexcept
            { return __nested_mapping_type::is_always_unique(); }
          static constexpr bool is_always_exhaustive() noexcept
            { return __nested_mapping_type::is_always_exhaustive(); }
          static constexpr bool is_always_strided() noexcept
            { return __nested_mapping_type::is_always_strided(); }
     
          constexpr bool is_unique() const 
            { return __nested_mapping.is_unique(); }
          constexpr bool is_exhaustive() const 
            { return __nested_mapping.is_exhaustive(); }
          constexpr bool is_strided() const 
            { return __nested_mapping.is_strided(); }
     
          constexpr index_type stride(size_t r) const;
     
          template<class OtherExtents>
          friend constexpr bool
            operator==(const mapping& x, const mapping<OtherExtents>& y);
        };
      };
    }
```

#### Concepts e traits auxiliares
```cpp
    namespace std::linalg {
      template<class T>
      struct __is_mdspan : false_type {}; // exposition only
     
      template<class ElementType, class Extents, class Layout, class Accessor>
      struct __is_mdspan<mdspan<ElementType, Extents, Layout, Accessor>>
      : true_type {}; // exposition only
     
      template<class T>
      concept __in_vector = // exposition only
        __is_mdspan<T>::value &&
        T::rank() == 1;
     
      template<class T>
      concept __out_vector = // exposition only
        __is_mdspan<T>::value &&
        T::rank() == 1 &&
        is_assignable_v<typename T::reference, typename T::element_type> &&
        T::is_always_unique();
     
      template<class T>
      concept __inout_vector = // exposition only
        __is_mdspan<T>::value &&
        T::rank() == 1 &&
        is_assignable_v<typename T::reference, typename T::element_type> &&
        T::is_always_unique();
     
      template<class T>
      concept __in_matrix = // exposition only
        __is_mdspan<T>::value &&
        T::rank() == 2;
     
      template<class T>
      concept __out_matrix = // exposition only
        __is_mdspan<T>::value &&
        T::rank() == 2 &&
        is_assignable_v<typename T::reference, typename T::element_type> &&
       T::is_always_unique();
     
      template<class T>
      concept __inout_matrix = // exposition only
        __is_mdspan<T>::value &&
        T::rank() == 2 &&
        is_assignable_v<typename T::reference, typename T::element_type> &&
        T::is_always_unique();
     
      template<class T>
      concept __possibly_packed_inout_matrix = // exposition only
        __is_mdspan<T>::value &&
        T::rank() == 2 &&
        is_assignable_v<typename T::reference, typename T::element_type> &&
        (T::is_always_unique() || is_same_v<typename T::layout_type, layout_blas_packed>);
     
      template<class T>
      concept __in_object = // exposition only
        __is_mdspan<T>::value &&
        (T::rank() == 1 || T::rank() == 2);
     
      template<class T>
      concept __out_object = // exposition only
        __is_mdspan<T>::value &&
        (T::rank() == 1 || T::rank() == 2) &&
        is_assignable_v<typename T::reference, typename T::element_type> &&
        T::is_always_unique();
     
      template<class T>
      concept __inout_object = // exposition only
        __is_mdspan<T>::value &&
        (T::rank() == 1 || T::rank() == 2) &&
        is_assignable_v<typename T::reference, typename T::element_type> &&
        T::is_always_unique();
    }
```