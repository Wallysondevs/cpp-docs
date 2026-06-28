# std::submdspan_mapping_result

Definido no cabeçalho `[<mdspan>](<#/doc/header/mdspan>)`

```c
template< class LayoutMapping >
struct submdspan_mapping_result;
```

Especializações de `submdspan_mapping_result` são tipos de resultado retornados por sobrecargas de `submdspan_mapping`.

Este template de classe não possui classes base ou membros declarados além dos mostrados abaixo.

### Parâmetros de template

- **LayoutMapping** — um tipo de mapeamento de layout que atende aos requisitos de [LayoutMapping](<#/doc/named_req/LayoutMapping>)

### Membros de dados

Nome do membro | Definição
---|---
mapping | mapeamento calculado do tipo `LayoutMapping`. É declarado com o atributo `[[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]`.
(objeto membro público)
offset | offset calculado do tipo [std::size_t](<#/doc/types/size_t>).
(objeto membro público)

Todos esses membros possuem inicializadores de membro padrão onde cada membro de dados é inicializado por valor.

### Veja também

[ submdspan](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/submdspan&action=edit&redlink=1> "cpp/container/mdspan/submdspan \(page does not exist\)")(C++26) | retorna uma view de um subconjunto de um `mdspan` existente
(template de função)
[ submdspan_mapping(std::layout_left::mapping)](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/layout_left/mapping/submdspan_mapping&action=edit&redlink=1> "cpp/container/mdspan/layout left/mapping/submdspan mapping \(page does not exist\)")(C++26) | calcula o mapeamento e o offset do handle de dados usados para `subdmspan`
(função membro pública de `std::layout_left::mapping<Extents>`)
[ submdspan_mapping(std::layout_right::mapping)](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/layout_right/mapping/submdspan_mapping&action=edit&redlink=1> "cpp/container/mdspan/layout right/mapping/submdspan mapping \(page does not exist\)")(C++26) | calcula o mapeamento e o offset do handle de dados usados para `subdmspan`
(função membro pública de `std::layout_right::mapping<Extents>`)
[ submdspan_mapping(std::layout_stride::mapping)](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/mdspan/layout_stride/mapping/submdspan_mapping&action=edit&redlink=1> "cpp/container/mdspan/layout stride/mapping/submdspan mapping \(page does not exist\)")(C++26) | calcula o mapeamento e o offset do handle de dados usados para `subdmspan`
(função membro pública de `std::layout_stride::mapping<Extents>`)