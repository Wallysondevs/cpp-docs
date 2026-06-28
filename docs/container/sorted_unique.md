# std::sorted_unique_t, std::sorted_unique

Definido no cabeçalho `[<flat_map>](<#/doc/header/flat_map>)`

```c
Definido no cabeçalho `<flat_set>`
struct sorted_unique_t { explicit sorted_unique_t() = default; };
inline constexpr sorted_unique_t sorted_unique{};
```

1) O tipo `std::sorted_unique_t` pode ser usado na lista de parâmetros da função (incluindo construtores) para corresponder à tag pretendida.

2) A instância `std::sorted_unique` correspondente de (1) é uma tag de desambiguação que pode ser passada para as funções de std::flat_map e std::flat_set para indicar que o range ou container de entrada está ordenado (em relação ao comparador usado no adaptador de container flat) e todos os elementos desse container ou range são únicos.

### Biblioteca padrão

Os seguintes adaptadores de container da biblioteca padrão usam (1,2) como tags de desambiguação:

[ flat_map](<#/doc/container/flat_map>)(C++23) | adapta dois containers para fornecer uma coleção de pares chave-valor, ordenados por chaves únicas
(modelo de classe)
[ flat_set](<#/doc/container/flat_set>)(C++23) | adapta um container para fornecer uma coleção de chaves únicas, ordenados por chaves
(modelo de classe)

### Veja também

[ sorted_equivalentsorted_equivalent_t](<#/doc/container/sorted_equivalent>)(C++23) | indica que os elementos de um range estão ordenados (unicidade não é exigida)
(tag)
[ from_range_tfrom_range](<#/doc/ranges/from_range>)(C++23) | tag de construção from-range
(tag)
[ in_placein_place_typein_place_indexin_place_tin_place_type_tin_place_index_t](<#/doc/utility/in_place>)(C++17) | tag de construção in-place
(tag)