# std::sorted_equivalent_t, std::sorted_equivalent

Definido no cabeçalho `[<flat_map>](<#/doc/header/flat_map>)`

```c
Definido no cabeçalho `<flat_set>`
struct sorted_equivalent_t { explicit sorted_equivalent_t() = default; };
inline constexpr sorted_equivalent_t sorted_equivalent{};
```

  
1) O tipo `std::sorted_equivalent_t` pode ser usado na lista de parâmetros da função (incluindo construtores) para corresponder ao tag pretendido.

2) A instância `std::sorted_equivalent` correspondente de (1) é um tag de desambiguação que pode ser passado para as funções de std::flat_multimap e std::flat_multiset para indicar que o input range ou contêiner está ordenado (em relação ao comparador usado no adaptador de contêiner flat), enquanto a unicidade dos elementos não é exigida.

### Standard library

Os seguintes adaptadores de contêiner da standard library usam (1,2) como tags de desambiguação: 

[ flat_multimap](<#/doc/container/flat_multimap>)(C++23) |  adapta dois contêineres para fornecer uma coleção de pares chave-valor, ordenados por chaves   
(class template)  
[ flat_multiset](<#/doc/container/flat_multiset>)(C++23) |  adapta um contêiner para fornecer uma coleção de chaves, ordenados por chaves   
(class template)  
  
### Veja também

[ sorted_uniquesorted_unique_t](<#/doc/container/sorted_unique>)(C++23) |  indica que os elementos de um range estão ordenados e são únicos  
(tag)  
[ from_range_tfrom_range](<#/doc/ranges/from_range>)(C++23) |  tag de construção from-range  
(tag)  
[ in_placein_place_typein_place_indexin_place_tin_place_type_tin_place_index_t](<#/doc/utility/in_place>)(C++17) |  tag de construção in-place  
(tag)