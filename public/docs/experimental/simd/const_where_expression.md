# std::experimental::const_where_expression

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class M, class V >
class const_where_expression;
```

O template de classe `const_where_expression` abstrai a noção de elementos selecionados de um dado objeto `const` de tipo aritmético ou de paralelismo de dados. Elementos selecionados significam os elementos data[i] para todo i ∈ `{` j ∈ ℕ | j < M::size() ⋀ mask[j] `}`.

### Parâmetros de template

- **M** — O tipo da máscara
- **V** — O tipo de valor sobre o qual M se aplica

Combinações válidas de `(M, V)` são: (simd_mask<T, Abi>, const simd<T, Abi>), (simd_mask<T, Abi>, const simd_mask<T, Abi>), (bool, const T).

### Funções membro

[ operator-operator+operator~](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/simd/const_where_expression/operator_arith&action=edit&redlink=1> "cpp/experimental/simd/const where expression/operator arith \(page does not exist\)") | operadores unários
(função membro pública)
[ copy_to](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/simd/const_where_expression/copy_to&action=edit&redlink=1> "cpp/experimental/simd/const where expression/copy to \(page does not exist\)") | armazena elementos selecionados no endereço
(função membro pública)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo