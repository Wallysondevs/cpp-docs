# std::ranges::in_in_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class I1, class I2 >
struct in_in_result;
```

`ranges::in_in_result` é um template de classe que fornece uma maneira de armazenar dois iteradores como uma única unidade.

Este template de classe não possui classes base ou membros declarados além dos mostrados abaixo. Assim, é adequado para uso com [structured bindings](<#/doc/language/structured_binding>).

Todas as funções membro especiais deste template de classe são implicitamente declaradas, o que faz com que as especializações sejam [aggregate classes](<#/doc/language/aggregate_initialization>), e propaguem a trivialidade, a capacidade de lançar exceções (potentially-throwing-ness) e a constexpr-ness das operações correspondentes nos membros de dados.

### Parâmetros de template

- **I1, I2** — os tipos dos iteradores que `ranges::in_in_result` armazena.

### Membros de dados

Nome do membro | Definição
---|---
in1 | um valor (que se supõe ser um iterador) do tipo `I1`.
(objeto membro público)
in2 | um valor (que se supõe ser um iterador) do tipo `I2`.
(objeto membro público)

Todos esses membros são declarados com o atributo `[[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]`.

### Funções membro

## std::ranges::in_in_result::operator in_in_result<II1, II2>

```cpp
template<class II1, class II2>
requires std::convertible_to<const I1&, II1> && std::convertible_to<const I2&, II2>
constexpr operator in_in_result<II1, II2>() const &;  // (1)
template<class II1, class II2>
requires std::convertible_to<I1, II1> && std::convertible_to<I2, II2>
constexpr operator in_in_result<II1, II2>() &&;  // (2)
```

Converte *this para o resultado construindo cada membro de dados do resultado a partir do membro correspondente de *this.

1) Equivalente a return {in1, in2};.

2) Equivalente a return {std::move(in1), std::move(in2)};.

### Biblioteca padrão

As seguintes funções da biblioteca padrão usam `ranges::in_in_result` como tipo de retorno:

##### Funções de algoritmo

---
[ ranges::mismatch](<#/doc/algorithm/ranges/mismatch>)(C++20) | encontra a primeira posição onde dois ranges diferem
(objeto de função de algoritmo)
[ ranges::swap_ranges](<#/doc/algorithm/ranges/swap_ranges>)(C++20) | troca dois ranges de elementos
(objeto de função de algoritmo)

### Sinopse
```cpp
    namespace std::ranges
    {
        template<class I1, class I2>
        struct in_in_result
        {
            [[no_unique_address]] I1 in1;
            [[no_unique_address]] I2 in2;
    
            template<class II1, class II2>
            requires std::convertible_to<const I1&, II1> && std::convertible_to<const I2&, II2>
            constexpr operator in_in_result<II1, II2>() const &
            {
                return {in1, in2};
            }
    
            template<class II1, class II2>
            requires std::convertible_to<I1, II1> && std::convertible_to<I2, II2>
            constexpr operator in_in_result<II1, II2>() &&
            {
                return {std::move(in1), std::move(in2)};
            }
        };
    }
```

### Notas

Cada algoritmo da biblioteca padrão que usa esta família de tipos de retorno declara um novo [tipo alias](<#/doc/language/type_alias>), por exemplo, using merge_result = in_in_out_result<I1, I2, O>;.

Os nomes para tais aliases são formados adicionando o sufixo "_`_result`_ " ao nome do algoritmo. Assim, o tipo de retorno de `std::ranges::merge` pode ser nomeado como `std::ranges::merge_result`.

Ao contrário de [std::pair](<#/doc/utility/pair>) e [std::tuple](<#/doc/utility/tuple>), este template de classe possui membros de dados com nomes significativos.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <ranges>
    
    int main()
    {
        constexpr static auto in1 = {1, 2, 3, 4};
        constexpr static auto in2 = {1, 2, 4, 5};
    
        constexpr auto result {std::ranges::mismatch(in1, in2)};
    
        static_assert(2 == std::ranges::distance(in1.begin(), result.in1));
        static_assert(2 == std::ranges::distance(in2.begin(), result.in2));
    }
```

### Veja também

[ pair](<#/doc/utility/pair>) | implementa tupla binária, ou seja, um par de valores
(template de classe)
[ tuple](<#/doc/utility/tuple>)(C++11) | implementa container de tamanho fixo, que armazena elementos de tipos possivelmente diferentes
(template de classe)