# std::ranges::in_out_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class I, class O >
struct in_out_result;
```

`ranges::in_out_result` é um template de classe que fornece uma maneira de armazenar dois iterators como uma única unidade.

Este template de classe não possui classes base ou membros declarados além dos mostrados abaixo. Assim, é adequado para uso com [structured bindings](<#/doc/language/structured_binding>).

Todas as funções membro especiais deste template de classe são implicitamente declaradas, o que torna as especializações [aggregate classes](<#/doc/language/aggregate_initialization>), e propaga a trivialidade, a capacidade de lançar exceções (potentially-throwing-ness) e a constexpr-ness das operações correspondentes nos membros de dados.

### Parâmetros de template

I, O | \- | os tipos dos objetos que `ranges::in_out_result` armazena.

### Membros de dados

Nome do membro | Definição
---|---
in | um valor (que se supõe ser um iterator) do tipo `I`.
(objeto membro público)
out | um valor (que se supõe ser um iterator) do tipo `O`.
(objeto membro público)

Todos esses membros são declarados com o atributo `[[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]`.

### Funções membro

## std::ranges::in_out_result::operator in_out_result<I2, O2>

```cpp
template<class I2, class O2>
requires std::convertible_to<const I&, I2> && std::convertible_to<const O&, O2>
constexpr operator in_out_result<I2, O2>() const &;  // (1)
template<class I2, class O2>
requires std::convertible_to<I, I2> && std::convertible_to<O, O2>
constexpr operator in_out_result<I2, O2>() &&;  // (2)
```

Converte *this para o resultado construindo cada membro de dados do resultado a partir do membro correspondente de *this.

1) Equivalente a return {in, out};.

2) Equivalente a return {std::move(in), std::move(out)};.

### Standard library

As seguintes funções da standard library usam `ranges::in_out_result` como tipo de retorno:

##### Funções de algoritmo
---
[ ranges::copyranges::copy_if](<#/doc/algorithm/ranges/copy>)(C++20)(C++20) | copia um range de elementos para um novo local
(objeto função de algoritmo)
[ ranges::copy_n](<#/doc/algorithm/ranges/copy_n>)(C++20) | copia um número de elementos para um novo local
(objeto função de algoritmo)
[ ranges::copy_backward](<#/doc/algorithm/ranges/copy_backward>)(C++20) | copia um range de elementos em ordem inversa
(objeto função de algoritmo)
[ ranges::move](<#/doc/algorithm/ranges/move>)(C++20) | move um range de elementos para um novo local
(objeto função de algoritmo)
[ ranges::move_backward](<#/doc/algorithm/ranges/move_backward>)(C++20) | move um range de elementos para um novo local em ordem inversa
(objeto função de algoritmo)
[ ranges::transform](<#/doc/algorithm/ranges/transform>)(C++20) | aplica uma função a um range de elementos
(objeto função de algoritmo)
[ ranges::replace_copyranges::replace_copy_if](<#/doc/algorithm/ranges/replace_copy>)(C++20)(C++20) | copia um range, substituindo elementos que satisfazem critérios específicos por outro valor
(objeto função de algoritmo)
[ ranges::remove_copyranges::remove_copy_if](<#/doc/algorithm/ranges/remove_copy>)(C++20)(C++20) | copia um range de elementos omitindo aqueles que satisfazem critérios específicos
(objeto função de algoritmo)
[ ranges::unique_copy](<#/doc/algorithm/ranges/unique_copy>)(C++20) | cria uma cópia de um range de elementos que não contém duplicatas consecutivas
(objeto função de algoritmo)
[ ranges::reverse_copy](<#/doc/algorithm/ranges/reverse_copy>)(C++20) | cria uma cópia de um range que é invertido
(objeto função de algoritmo)
[ ranges::rotate_copy](<#/doc/algorithm/ranges/rotate_copy>)(C++20) | copia e rotaciona um range de elementos
(objeto função de algoritmo)
[ ranges::partial_sort_copy](<#/doc/algorithm/ranges/partial_sort_copy>)(C++20) | copia e parcialmente ordena um range de elementos
(objeto função de algoritmo)
[ ranges::set_difference](<#/doc/algorithm/ranges/set_difference>)(C++20) | calcula a diferença entre dois conjuntos
(objeto função de algoritmo)

##### Funções de memória

[ ranges::uninitialized_copy](<#/doc/memory/ranges/uninitialized_copy>)(C++20) | copia um range de objetos para uma área de memória não inicializada
(objeto função de algoritmo)
[ ranges::uninitialized_copy_n](<#/doc/memory/ranges/uninitialized_copy_n>)(C++20) | copia um número de objetos para uma área de memória não inicializada
(objeto função de algoritmo)
[ ranges::uninitialized_move](<#/doc/memory/ranges/uninitialized_move>)(C++20) | move um range de objetos para uma área de memória não inicializada
(objeto função de algoritmo)
[ ranges::uninitialized_move_n](<#/doc/memory/ranges/uninitialized_move_n>)(C++20) | move um número de objetos para uma área de memória não inicializada
(objeto função de algoritmo)

### Sinopse
```cpp
    namespace std::ranges
    {
        template<class I, class O>
        struct in_out_result
        {
            [[no_unique_address]] I in;
            [[no_unique_address]] O out;
    
            template<class I2, class O2>
            requires std::convertible_to<const I&, I2> && std::convertible_to<const O&, O2>
            constexpr operator in_out_result<I2, O2>() const &
            {
                return {in, out};
            }
    
            template<class I2, class O2>
            requires std::convertible_to<I, I2> && std::convertible_to<O, O2>
            constexpr operator in_out_result<I2, O2>() &&
            {
                return {std::move(in), std::move(out)};
            }
        };
    }
```

### Notas

Cada algoritmo da standard library que usa esta família de tipos de retorno declara um novo [alias type](<#/doc/language/type_alias>), por exemplo, using merge_result = in_in_out_result<I1, I2, O>;.

Os nomes para tais aliases são formados adicionando o sufixo "_`_result`_ " ao nome do algoritmo. Assim, o tipo de retorno de `std::ranges::merge` pode ser nomeado como `std::ranges::merge_result`.

Ao contrário de [std::pair](<#/doc/utility/pair>) e [std::tuple](<#/doc/utility/tuple>), este template de classe possui membros de dados com nomes significativos.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <cctype>
    #include <iostream>
    #include <ranges>
    
    int main()
    {
        constexpr char in[] = "transform" "\n";
        std::array<char, sizeof(in)> out;
    
        const auto result = std::ranges::transform(in, out.begin(),
             { return std::toupper(c); });
    
        auto print =  { std::cout << c; };
        std::ranges::for_each(std::cbegin(in), result.in, print);
        std::ranges::for_each(out.cbegin(), result.out, print);
    }
```

Saída:
```
    transform
    TRANSFORM
```

### Veja também

[ pair](<#/doc/utility/pair>) | implementa tupla binária, ou seja, um par de valores
(template de classe)
[ tuple](<#/doc/utility/tuple>)(C++11) | implementa container de tamanho fixo, que armazena elementos de tipos possivelmente diferentes
(template de classe)