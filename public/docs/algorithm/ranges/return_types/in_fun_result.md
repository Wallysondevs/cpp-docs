# std::ranges::in_fun_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class I, class F >
struct in_fun_result;
```

`ranges::in_fun_result` é um template de classe que fornece uma maneira de armazenar um iterator e um function object como uma única unidade.

Este template de classe não possui classes base ou membros declarados além dos mostrados abaixo. Assim, é adequado para uso com [structured bindings](<#/doc/language/structured_binding>).

Todas as funções membro especiais deste template de classe são implicitamente declaradas, o que faz com que as especializações sejam [aggregate classes](<#/doc/language/aggregate_initialization>), e propaguem a trivialidade, a capacidade de lançar exceções (potentially-throwing-ness) e a constexpr-ness das operações correspondentes nos membros de dados.

### Parâmetros de template

- **I** — o tipo do iterator que `ranges::in_fun_result` armazena.
- **F** — o tipo do function object que `ranges::in_fun_result` armazena.

### Membros de dados

Nome do membro | Definição
---|---
in | um valor (que se supõe ser um iterator) do tipo `I`.
(objeto membro público)
fun | um valor (que se supõe ser um function object) do tipo `F`.
(objeto membro público)

Todos esses membros são declarados com o atributo `[[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]`.

### Funções membro

## std::ranges::in_fun_result::operator in_fun_result<I2, F2>

```cpp
template<class I2, class F2>
requires std::convertible_to<const I&, I2> && std::convertible_to<const F&, F2>
constexpr operator in_fun_result<I2, F2>() const &;  // (1)
template<class I2, class F2>
requires std::convertible_to<I, I2> && std::convertible_to<F, F2>
constexpr operator in_fun_result<I2, F2>() &&;  // (2)
```

Converte *this para o resultado construindo cada membro de dados do resultado a partir do membro correspondente de *this.

1) Equivalente a return {in, fun};.

2) Equivalente a return {std::move(in), std::move(fun)};.

### Biblioteca padrão

As seguintes funções da biblioteca padrão usam `ranges::in_fun_result` como tipo de retorno:

##### Funções de algoritmo
---
[ ranges::for_each](<#/doc/algorithm/ranges/for_each>)(C++20) | aplica uma função a um range de elementos
(function object de algoritmo)
[ ranges::for_each_n](<#/doc/algorithm/ranges/for_each_n>)(C++20) | aplica um function object aos primeiros N elementos de uma sequência
(function object de algoritmo)

### Sinopse
```cpp
    namespace std::ranges
    {
        template<class I, class F>
        struct in_fun_result
        {
            [[no_unique_address]] I in;
            [[no_unique_address]] F fun;
    
            template<class I2, class F2>
            requires std::convertible_to<const I&, I2> && std::convertible_to<const F&, F2>
            constexpr operator in_fun_result<I2, F2>() const &
            {
                return {in, fun};
            }
    
            template<class I2, class F2>
            requires std::convertible_to<I, I2> && std::convertible_to<F, F2>
            constexpr operator in_fun_result<I2, F2>() &&
            {
                return {std::move(in), std::move(fun)};
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
    #include <cassert>
    #include <iostream>
    #include <iterator>
    #include <ranges>
    
    int main()
    {
        int v[]{1, 2, 3};
    
        const std::ranges::in_fun_result res1 = std::ranges::for_each_n(
            v, std::size(v),
             { return x = -x; } // negating lambda
        );
        assert(res1.in == std::end(v));
    
        const std::ranges::in_fun_result res2 = std::ranges::for_each(
            std::begin(v),
            res1.in,
             { std::cout << x << ' '; } // printing lambda
        );
    
        std::cout << "│ ";
    
        std::ranges::for_each(v, res1.fun); // uses negating lambda
        std::ranges::for_each(v, res2.fun); // uses printing lambda
        std::cout << '\n';
    }
```

Saída:
```
    -1 -2 -3 │ 1 2 3
```

### Veja também

[ pair](<#/doc/utility/pair>) | implementa tupla binária, ou seja, um par de valores
(template de classe)
[ tuple](<#/doc/utility/tuple>)(C++11) | implementa container de tamanho fixo, que armazena elementos de tipos possivelmente diferentes
(template de classe)