# std::ranges::owning_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::range R >
requires std::movable<R> && (!/*is-initializer-list*/<R>)
class owning_view
: public ranges::view_interface<owning_view<R>>
```

`owning_view` é uma [`view`](<#/doc/ranges/view>) que possui propriedade única de um [`range`](<#/doc/ranges/range>). É apenas movível (`move-only`) e armazena esse `range` dentro dela.

A constante /*is-initializer-list*/&lt;R&gt; na cláusula `requires` é verdadeira se e somente se [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;R&gt; for uma especialização de [std::initializer_list](<#/doc/utility/initializer_list>).

### Membros de dados

Nome do membro | Definição
---|---
`_r__` (private) | O `range` subjacente do tipo `R`.
(objeto membro apenas para exposição*)

### Funções membro

[ (constructor)](<#/doc/ranges/owning_view>) | constrói uma `owning_view` por inicialização por valor ou construção por movimento (`move-constructing`) do `range` armazenado
(função membro pública)
[ operator=](<#/doc/ranges/owning_view>) | atribui por movimento (`move-assigns`) o `range` armazenado
(função membro pública)
[ base](<#/doc/ranges/owning_view>) | retorna uma referência para o `range` armazenado
(função membro pública)
[ begin](<#/doc/ranges/owning_view>) | retorna o `iterator` inicial do `range` armazenado
(função membro pública)
[ end](<#/doc/ranges/owning_view>) | retorna o `sentinel` do `range` armazenado
(função membro pública)
[ empty](<#/doc/ranges/owning_view>) | verifica se o `range` armazenado está vazio
(função membro pública)
[ size](<#/doc/ranges/owning_view>) | retorna o tamanho do [`sized_range`](<#/doc/ranges/sized_range>) armazenado
(função membro pública)
[ data](<#/doc/ranges/owning_view>) | retorna o ponteiro para o início do [`contiguous_range`](<#/doc/ranges/contiguous_range>) armazenado
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um `iterator` constante para o início do `range`.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um `sentinel` para o `iterator` constante do `range`.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se a `view` derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) for aplicável a ela.
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na `view` derivada. Fornecido se ela satisfaz [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento na `view` derivada. Fornecido se ela satisfaz [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento na `view` derivada. Fornecido se ela satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

## std::ranges::owning_view::owning_view

```cpp
owning_view() requires std::default_initializable<R> = default;  // (1) (desde C++20)
owning_view( owning_view&& other ) = default;  // (2) (desde C++20)
constexpr owning_view( R&& t );  // (3) (desde C++20)
owning_view( const owning_view& ) = delete;  // (4) (desde C++20)
```

1) Construtor padrão. Inicializa por valor (`value-initializes`) o `range` armazenado pelo seu inicializador de membro padrão (= R()).

2) Construtor de movimento (`move constructor`). Constrói por movimento (`move constructs`) o `range` armazenado a partir do de `other`.

3) Constrói por movimento (`move constructs`) o `range` armazenado a partir de `t`.

4) Construtor de cópia é deletado. `owning_view` é apenas movível (`move-only`).

### Parâmetros

- **other** — outra `owning_view` para mover de
- **t** — `range` para mover de

## std::ranges::owning_view::operator=

```cpp
owning_view& operator=( owning_view&& other ) = default;  // (1) (desde C++20)
owning_view& operator=( const owning_view& ) = delete;  // (2) (desde C++20)
```

1) Operador de atribuição por movimento (`move assignment operator`). Atribui por movimento (`move assigns`) o `range` armazenado a partir do de `other`.

2) Operador de atribuição por cópia é deletado. `owning_view` é apenas movível (`move-only`).

### Parâmetros

- **other** — outra `owning_view` para mover de

### Valor de retorno

*this

## std::ranges::owning_view::base

```cpp
constexpr R& base() & noexcept;  // (1) (desde C++20)
constexpr const R& base() const & noexcept;  // (2) (desde C++20)
constexpr R&& base() && noexcept;  // (3) (desde C++20)
constexpr const R&& base() const && noexcept;  // (4) (desde C++20)
```

Retorna uma referência para o `range` armazenado, mantendo a categoria de valor e a qualificação `const`.

1,2) Equivalente a return r_;.

3,4) Equivalente a return std::move(r_);.

## std::ranges::owning_view::begin

```cpp
constexpr ranges::iterator_t<R> begin();  // (1) (desde C++20)
constexpr auto begin() const requires ranges::range<const R>;  // (2) (desde C++20)
```

Equivalente a return [ranges::begin](<#/doc/ranges/begin>)(r_);.

## std::ranges::owning_view::end

```cpp
constexpr ranges::sentinel_t<R> end();  // (1) (desde C++20)
constexpr auto end() const requires ranges::range<const R>;  // (2) (desde C++20)
```

Equivalente a return [ranges::end](<#/doc/ranges/end>)(r_);.

## std::ranges::owning_view::empty

```cpp
constexpr bool empty() requires requires { ranges::empty(r_); };  // (1) (desde C++20)
constexpr bool empty() const requires requires { ranges::empty(r_); };  // (2) (desde C++20)
```

Equivalente a return [ranges::empty](<#/doc/ranges/empty>)(r_);.

## std::ranges::owning_view::size

```cpp
constexpr auto size() requires ranges::sized_range<R>;  // (1) (desde C++20)
constexpr auto size() const requires ranges::sized_range<const R>;  // (2) (desde C++20)
```

Equivalente a return [ranges::size](<#/doc/ranges/size>)(r_);.

## std::ranges::owning_view::data

```cpp
constexpr auto data() requires ranges::contiguous_range<R>;  // (1) (desde C++20)
constexpr auto data() const requires ranges::contiguous_range<const R>;  // (2) (desde C++20)
```

Equivalente a return [ranges::data](<#/doc/ranges/data>)(r_);.

### Modelos auxiliares

```cpp
template< class T >
constexpr bool enable_borrowed_range<std::ranges::owning_view<T>> =
ranges::enable_borrowed_range<T>;  // (desde C++20)
```

Esta especialização de [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>) faz com que `owning_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>) quando o `range` subjacente a satisfaz.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    #include <ranges>
    #include <string>
     
    int main()
    {
        using namespace std::literals;
        std::ranges::owning_view ov{"cosmos"s}; // o tipo deduzido de R é std::string;
                                                // `ov` é o único proprietário desta string
        assert(
            ov.empty() == false &&
            ov.size() == 6 &&
            ov.size() == ov.base().size() &&
            ov.front() == 'c' &&
            ov.front() == *ov.begin() &&
            ov.back() == 's' &&
            ov.back() == *(ov.end() - 1) &&
            ov.data() == ov.base()
        );
     
        std::cout << "sizeof(ov): " << sizeof ov << '\n' // tipicamente igual a sizeof(R)
                  << "range-for: ";
        for (const char ch : ov)
            std::cout << ch;
        std::cout << '\n';
     
        std::ranges::owning_view<std::string> ov2;
        assert(ov2.empty());
    //  ov2 = ov; // erro em tempo de compilação: operador de atribuição por cópia é deletado
        ov2 = std::move(ov); // OK
        assert(ov2.size() == 6);
    }
```

Saída possível:
```
    sizeof(ov): 32
    range-for: cosmos
```

### Veja também

[ ranges::ref_view](<#/doc/ranges/ref_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) dos elementos de algum outro [`range`](<#/doc/ranges/range>)
(modelo de classe)
[ views::all_tviews::all](<#/doc/ranges/all_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) que inclui todos os elementos de um [`range`](<#/doc/ranges/range>)
(modelo de alias) (objeto adaptador de `range`)