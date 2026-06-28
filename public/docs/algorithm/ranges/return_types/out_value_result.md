# std::ranges::out_value_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class O, class T >
struct out_value_result;
```

`ranges::out_value_result` é um template de classe que fornece uma maneira de armazenar um iterator e um valor como uma única unidade.

Este template de classe não possui classes base ou membros declarados além dos mostrados abaixo. Assim, é adequado para uso com [structured bindings](<#/doc/language/structured_binding>).

Todas as funções membro especiais deste template de classe são implicitamente declaradas, o que faz com que as especializações sejam [aggregate classes](<#/doc/language/aggregate_initialization>), e propaguem a trivialidade, a capacidade de lançar exceções (potentially-throwing-ness) e a constexpr-ness das operações correspondentes nos membros de dados.

### Parâmetros de template

- **O, T** — os tipos dos objetos que `ranges::out_value_result` armazena.

### Membros de dados

Nome do membro | Definição
---|---
out | um valor (que se supõe ser um iterator) do tipo `O`.
(objeto membro público)
value | um valor (que se supõe ser um valor armazenado) do tipo `T`.
(objeto membro público)

Todos esses membros são declarados com o atributo `[[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]`.

### Funções membro

## std::ranges::out_value_result::operator out_value_result<O2, T2>

```cpp
template<class O2, class T2>
requires convertible_to<const O&, O2> && convertible_to<const T&, T2>
constexpr operator out_value_result<O2, T2>() const &;  // (1)
template<class O2, class T2>
requires convertible_to<O, O2> && convertible_to<T, T2>
constexpr operator out_value_result<O2, T2>() &&;  // (2)
```

Converte *this para o resultado construindo cada membro de dados do resultado a partir do membro correspondente de *this.

1) Equivalente a return {out, value};.

2) Equivalente a return {std::move(out), std::move(value)};.

### Biblioteca padrão

As seguintes funções da biblioteca padrão usam `ranges::out_value_result` como tipo de retorno:

##### Funções de algoritmo

---
[ ranges::iota](<#/doc/algorithm/ranges/iota>)(C++23) | preenche um range com incrementos sucessivos do valor inicial
(objeto de função de algoritmo)

### Sinopse
```cpp
    namespace std::ranges
    {
        template<class O, class T>
        struct out_value_result
        {
            [[no_unique_address]] O out;
            [[no_unique_address]] T value;
    
            template<class O2, class T2>
            requires convertible_to<const O&, O2> && convertible_to<const T&, T2>
            constexpr operator out_value_result<O2, T2>() const &
            {
                return {out, value};
            }
    
            template<class O2, class T2>
            requires convertible_to<O, O2> && convertible_to<T, T2>
            constexpr operator out_value_result<O2, T2>() &&
            {
                return {std::move(out), std::move(value)};
            }
        };
    }
```

### Notas

Cada algoritmo da biblioteca padrão que usa esta família de tipos de retorno declara um novo [alias type](<#/doc/language/type_alias>), por exemplo, using merge_result = in_in_out_result<I1, I2, O>;.

Os nomes para tais aliases são formados adicionando o sufixo "_`_result`_ " ao nome do algoritmo. Assim, o tipo de retorno de `std::ranges::merge` pode ser nomeado como `std::ranges::merge_result`.

Ao contrário de [std::pair](<#/doc/utility/pair>) e [std::tuple](<#/doc/utility/tuple>), este template de classe possui membros de dados com nomes significativos.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <cassert>
    #include <numeric>
    #include <ranges>
    
    int main()
    {
        std::array<int, 4> a{};
        constexpr std::array expected{2, 3, 4, 5};
        const auto result = std::ranges::iota(a, 2);
        assert(std::ranges::distance(a.cbegin(), result.out) == 4);
        assert(result.value == 6);
        assert(a == expected);
    }
```

### Veja também

[ pair](<#/doc/utility/pair>) | implementa tupla binária, ou seja, um par de valores
(template de classe)
[ tuple](<#/doc/utility/tuple>)(C++11) | implementa container de tamanho fixo, que armazena elementos de tipos possivelmente diferentes
(template de classe)