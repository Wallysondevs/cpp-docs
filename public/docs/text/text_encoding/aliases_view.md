# std::text_encoding::aliases_view

```cpp
class text_encoding::aliases_view
: public ranges::view_interface<text_encoding::aliases_view>  // (desde C++26)
```

  
A classe aninhada `text_encoding::aliases_view` é uma [`view`](<#/doc/ranges/view>) sobre aliases da codificação de caracteres.

Seja r uma instância de `aliases_view`. Para um range r não vazio:

  * r.front() é o nome primário da codificação de caracteres registrada,
  * r contém os aliases da codificação de caracteres registrada, de modo que a ordem dos aliases é não especificada,
  * cada elemento em r é uma string de bytes terminada em nulo, não nula e não vazia, codificada na [codificação de caracteres literal](<#/doc/language/charset>) e compreendendo apenas caracteres do [conjunto de caracteres básico](<#/doc/language/charset>), e
  * r não contém valores duplicados quando comparado com [std::strcmp](<#/doc/string/byte/strcmp>).

Estas são as seguintes propriedades de tipo de `text_encoding::aliases_view`:

  * ele modela [`copyable`](<#/doc/concepts/copyable>), [`random_access_range`](<#/doc/ranges/random_access_range>), e [`borrowed_range`](<#/doc/ranges/borrowed_range>).
  * não é exigido que ele satisfaça [`common_range`](<#/doc/ranges/common_range>) e [`default_initializable`](<#/doc/concepts/default_initializable>).
  * ambos [ranges::range_value_t](<#/doc/ranges/range_size_t>)<text_encoding​::​aliases_view> e [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)<text_encoding::aliases_view> denotam const char*.
  * [ranges::iterator_t](<#/doc/ranges/iterator_t>)<text_encoding::aliases_view> é um [ConstexprIterator](<#/doc/named_req/ConstexprIterator>).

### Funções membro

begin | retorna um iterator de tipo definido pela implementação para o início da view de aliases   
(função membro pública)  
end | retorna um sentinel de tipo definido pela implementação da view de aliases   
(função membro pública)  
  
#####  Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)  
  
[ empty](<#/doc/ranges/view_interface/empty>) | retorna se a view derivada está vazia. Fornecido se satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).   
(função membro pública de `std::ranges::view_interface<D>`)  
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.   
(função membro pública de `std::ranges::view_interface<D>`)  
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.   
(função membro pública de `std::ranges::view_interface<D>`)  
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) é aplicável a ela.   
(função membro pública de `std::ranges::view_interface<D>`)  
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na view derivada. Fornecido se satisfaz [`forward_range`](<#/doc/ranges/forward_range>).   
(função membro pública de `std::ranges::view_interface<D>`)  
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento na view derivada. Fornecido se satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).   
(função membro pública de `std::ranges::view_interface<D>`)  
  
##  std::text_encoding::aliases_view::begin

```cpp
constexpr /*implementation-defined*/ begin() const;  // (desde C++26)
```

  
Retorna um iterator de tipo definido pela implementação para o início de r.

##  std::text_encoding::aliases_view::end

```cpp
constexpr /*implementation-defined*/ end() const;  // (desde C++26)
```

  
Retorna um sentinel de tipo definido pela implementação de r.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ aliases](<#/doc/text/text_encoding/aliases>) | retorna uma [`view`](<#/doc/ranges/view>) sobre aliases da codificação de caracteres atual   
(função membro pública)  