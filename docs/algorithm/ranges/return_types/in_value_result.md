# std::ranges::in_value_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class I, class T >
struct in_value_result;
```

`ranges::in_value_result` é um template de classe que fornece uma maneira de armazenar um iterator e um valor como uma única unidade.

Este template de classe não possui classes base ou membros declarados além dos mostrados abaixo. Assim, é adequado para uso com [structured bindings](<#/doc/language/structured_binding>).

Todas as funções membro especiais deste template de classe são implicitamente declaradas, o que faz com que as especializações sejam [aggregate classes](<#/doc/language/aggregate_initialization>), e propaguem a trivialidade, a capacidade de lançar exceções (potentially-throwing-ness) e a constexpr-ness das operações correspondentes nos membros de dados.

### Parâmetros de template

- **I, T** — os tipos dos objetos que `ranges::in_value_result` armazena.

### Membros de dados

Nome do membro | Definição
---|---
in | um valor (que se supõe ser um iterator) do tipo `I`.
(objeto membro público)
value | um valor (que se supõe ser um valor armazenado) do tipo `T`.
(objeto membro público)

Todos esses membros são declarados com o atributo `[[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]`.

### Funções membro

## std::ranges::in_value_result::operator in_value_result<I2, T2>

```cpp
template<class I2, class T2>
requires convertible_to<const I&, I2> && convertible_to<const T&, T2>
constexpr operator in_value_result<I2, T2>() const &;  // (1)
template<class I2, class T2>
requires convertible_to<I, I2> && convertible_to<T, T2>
constexpr operator in_value_result<I2, T2>() &&;  // (2)
```

Converte *this para o resultado construindo cada membro de dados do resultado a partir do membro correspondente de *this.

1) Equivalente a return {in, value};.

2) Equivalente a return {std::move(in), std::move(value)};.

### Biblioteca padrão

As seguintes funções da biblioteca padrão usam `ranges::in_value_result` como tipo de retorno:

##### Funções de algoritmo

---
[ ranges::fold_left_with_iter](<#/doc/algorithm/ranges/fold_left_with_iter>)(C++23) | faz um fold à esquerda de um range de elementos, e retorna um **par** (iterator, valor)
(objeto de função de algoritmo)
[ ranges::fold_left_first_with_iter](<#/doc/algorithm/ranges/fold_left_first_with_iter>)(C++23) | faz um fold à esquerda de um range de elementos usando o primeiro elemento como valor inicial, e retorna um **par** (iterator, [optional](<#/doc/utility/optional>))
(objeto de função de algoritmo)

### Sinopse
```cpp
    namespace std::ranges
    {
        template<class I, class T>
        struct in_value_result
        {
            [[no_unique_address]] I in;
            [[no_unique_address]] T value;
    
            template<class I2, class T2>
            requires convertible_to<const I&, I2> && convertible_to<const T&, T2>
            constexpr operator in_value_result<I2, T2>() const &
            {
                return {in, value};
            }
    
            template<class I2, class T2>
            requires convertible_to<I, I2> && convertible_to<T, T2>
            constexpr operator in_value_result<I2, T2>() &&
            {
                return {std::move(in), std::move(value)};
            }
        };
    }
```

### Notas

Cada algoritmo da biblioteca padrão que usa esta família de tipos de retorno declara um novo [tipo de alias](<#/doc/language/type_alias>), por exemplo, using merge_result = in_in_out_result<I1, I2, O>;.

Os nomes para tais aliases são formados adicionando o sufixo "_`_result`_ " ao nome do algoritmo. Assim, o tipo de retorno de `std::ranges::merge` pode ser nomeado como `std::ranges::merge_result`.

Ao contrário de [std::pair](<#/doc/utility/pair>) e [std::tuple](<#/doc/utility/tuple>), este template de classe possui membros de dados com nomes significativos.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <functional>
    
    int main()
    {
        const auto v = {1, 2, 3};
        const auto ret = std::ranges::fold_left_with_iter(v, 4, std::plus<>());
        assert(ret.in == v.end());
        assert(ret.value == 1 + 2 + 3 + 4);
    }
```

### Veja também

[ pair](<#/doc/utility/pair>) | implementa tupla binária, ou seja, um par de valores
(template de classe)
[ tuple](<#/doc/utility/tuple>)(C++11) | implementa um container de tamanho fixo, que armazena elementos de tipos possivelmente diferentes
(template de classe)