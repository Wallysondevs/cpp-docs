# std::ranges::in_in_out_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class I1, class I2, class O >
struct in_in_out_result;
```

`ranges::in_in_out_result` é um template de classe que fornece uma maneira de armazenar três iterators como uma única unidade.

Este template de classe não possui classes base ou membros declarados além dos mostrados abaixo. Assim, é adequado para uso com [structured bindings](<#/doc/language/structured_binding>).

Todas as funções membro especiais deste template de classe são implicitamente declaradas, o que faz com que as especializações sejam [aggregate classes](<#/doc/language/aggregate_initialization>), e propaguem a trivialidade, a capacidade de lançar exceções (potentially-throwing-ness) e a constexpr-ness das operações correspondentes nos membros de dados.

### Parâmetros de template

- **I1, I2, O** — os tipos dos iterators que `ranges::in_in_out_result` armazena.

### Membros de dados

Nome do membro | Definição
---|---
in1 | um valor (que se supõe ser um iterator) do tipo `I1`.
(objeto membro público)
in2 | um valor (que se supõe ser um iterator) do tipo `I2`.
(objeto membro público)
out | um valor (que se supõe ser um iterator) do tipo `O`.
(objeto membro público)

Todos esses membros são declarados com o atributo `[[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]`.

### Funções membro

## std::ranges::in_in_out_result::operator in_in_out_result<II1, II2, OO>

```cpp
template<class II1, class II2, class OO>
requires std::convertible_to<const I1&, II1> &&
std::convertible_to<const I2&, II2> &&
std::convertible_to<const O&, OO>
constexpr operator in_in_out_result<II1, II2, OO>() const &;  // (1)
template<class II1, class II2, class OO>
requires std::convertible_to<I1, II1> &&
std::convertible_to<I2, II2> &&
std::convertible_to<O, OO>
constexpr operator in_in_out_result<II1, II2, OO>() &&;  // (2)
```

Converte *this para o resultado construindo cada membro de dados do resultado a partir do membro correspondente de *this.

1) Equivalente a return {in1, in2, out};.

2) Equivalente a return {std::move(in1), std::move(in2), std::move(out)};.

### Biblioteca padrão

As seguintes funções da biblioteca padrão usam `ranges::in_in_out_result` como tipo de retorno:

##### Funções de algoritmo

---
[ ranges::transform](<#/doc/algorithm/ranges/transform>)(C++20) | aplica uma função a um range de elementos
(objeto de função de algoritmo)
[ ranges::merge](<#/doc/algorithm/ranges/merge>)(C++20) | mescla dois ranges ordenados
(objeto de função de algoritmo)
[ ranges::set_union](<#/doc/algorithm/ranges/set_union>)(C++20) | calcula a união de dois conjuntos
(objeto de função de algoritmo)
[ ranges::set_intersection](<#/doc/algorithm/ranges/set_intersection>)(C++20) | calcula a interseção de dois conjuntos
(objeto de função de algoritmo)
[ ranges::set_symmetric_difference](<#/doc/algorithm/ranges/set_symmetric_difference>)(C++20) | calcula a diferença simétrica entre dois conjuntos
(objeto de função de algoritmo)

### Sinopse
```cpp
    namespace std::ranges
    {
        template<class I1, class I2, class O>
        struct in_in_out_result
        {
            [[no_unique_address]] I1 in1;
            [[no_unique_address]] I2 in2;
            [[no_unique_address]] O  out;
    
            template<class II1, class II2, class OO>
            requires std::convertible_to<const I1&, II1> &&
                     std::convertible_to<const I2&, II2> &&
                     std::convertible_to<const O&, OO>
            constexpr operator in_in_out_result<II1, II2, OO>() const &
            {
                return {in1, in2, out};
            }
    
            template<class II1, class II2, class OO>
            requires std::convertible_to<I1, II1> &&
                     std::convertible_to<I2, II2> &&
                     std::convertible_to<O, OO>
            constexpr operator in_in_out_result<II1, II2, OO>() &&
            {
                return {std::move(in1), std::move(in2), std::move(out)};
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
    #include <iostream>
    #include <iterator>
    #include <ranges>
    
    void print(auto rem, auto first, auto last)
    {
        for (std::cout << rem << ": "; first != last; ++first)
            std::cout << *first << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        constexpr static auto in1 = {1, 2, 3, 4, 5, 5};
        constexpr static auto in2 = {3, 4, 5, 6, 7};
        std::array<int, std::size(in1) + std::size(in2)> out;
    
        const auto result = std::ranges::merge(in1, in2, out.begin());
        print("in1", in1.begin(), result.in1);
        print("in2", in2.begin(), result.in2);
        print("out", out.begin(), result.out);
    }
```

Saída:
```
    in1: 1 2 3 4 5 5 
    in2: 3 4 5 6 7 
    out: 1 2 3 3 4 4 5 5 5 6 7
```

### Veja também

[ pair](<#/doc/utility/pair>) | implementa tupla binária, ou seja, um par de valores
(template de classe)
[ tuple](<#/doc/utility/tuple>)(C++11) | implementa container de tamanho fixo, que armazena elementos de tipos possivelmente diferentes
(template de classe)