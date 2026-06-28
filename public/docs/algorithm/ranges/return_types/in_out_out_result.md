# std::ranges::in_out_out_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class I, class O1, class O2 >
struct in_out_out_result;
```

`ranges::in_out_out_result` é um template de classe que fornece uma maneira de armazenar três iteradores como uma única unidade.

Este template de classe não possui classes base ou membros declarados além dos mostrados abaixo. Assim, é adequado para uso com [structured bindings](<#/doc/language/structured_binding>).

Todas as funções membro especiais deste template de classe são implicitamente declaradas, o que faz com que as especializações sejam [aggregate classes](<#/doc/language/aggregate_initialization>), e propaguem a trivialidade, a capacidade de lançar exceções (potentially-throwing-ness) e a constexpr-ness das operações correspondentes nos membros de dados.

### Parâmetros de template

- **I, O1, O2** — os tipos dos objetos que `ranges::in_out_out_result` armazena.

### Membros de dados

Nome do membro | Definição
---|---
in | um valor (que se supõe ser um iterator) do tipo `I`.
(objeto membro público)
out1 | um valor (que se supõe ser um iterator) do tipo `O1`.
(objeto membro público)
out2 | um valor (que se supõe ser um iterator) do tipo `O2`.
(objeto membro público)

Todos esses membros são declarados com o atributo `[[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]`.

### Funções membro

## std::ranges::in_out_out_result::operator in_out_out_result<II, OO1, OO2>

```cpp
template<class II, class OO1, class OO2>
requires std::convertible_to<const I&, II> &&
std::convertible_to<const O1&, OO1> &&
std::convertible_to<const O2&, OO2>
constexpr operator in_out_out_result<II, OO1, OO2>() const &;  // (1)
template<class II, class OO1, class OO2>
requires std::convertible_to<I, II> &&
std::convertible_to<O1, OO1> &&
std::convertible_to<O2, OO2>
constexpr operator in_out_out_result<II, OO1, OO2>() &&;  // (2)
```

Converte *this para o resultado construindo cada membro de dados do resultado a partir do membro correspondente de *this.

1) Equivalente a `return {in, out1, out2};`.

2) Equivalente a `return {std::move(in), std::move(out1), std::move(out2)};`.

### Biblioteca padrão

As seguintes funções da biblioteca padrão usam `ranges::in_out_out_result` como tipo de retorno:

##### Funções de algoritmo

---
[ ranges::partition_copy](<#/doc/algorithm/ranges/partition_copy>)(C++20) | copia um range dividindo os elementos em dois grupos
(objeto de função de algoritmo)

### Sinopse
```cpp
    namespace std::ranges
    {
        template<class I, class O1, class O2>
        struct in_out_out_result
        {
            [[no_unique_address]] I  in;
            [[no_unique_address]] O1 out1;
            [[no_unique_address]] O2 out2;
    
            template<class II, class OO1, class OO2>
            requires std::convertible_to<const I&, II> &&
                     std::convertible_to<const O1&, OO1> &&
                     std::convertible_to<const O2&, OO2>
            constexpr operator in_out_out_result<II, OO1, OO2>() const &
            {
                return {in, out1, out2};
            }
    
            template<class II, class OO1, class OO2>
            requires std::convertible_to<I, II> &&
                     std::convertible_to<O1, OO1> &&
                     std::convertible_to<O2, OO2>
            constexpr operator in_out_out_result<II, OO1, OO2>() &&
            {
                return {std::move(in), std::move(out1), std::move(out2)};
            }
        };
    }
```

### Notas

Cada algoritmo da biblioteca padrão que usa esta família de tipos de retorno declara um novo [alias type](<#/doc/language/type_alias>), por exemplo, `using merge_result = in_in_out_result<I1, I2, O>;`.

Os nomes para tais aliases são formados adicionando o sufixo "_`_result`_" ao nome do algoritmo. Assim, o tipo de retorno de `std::ranges::merge` pode ser nomeado como `std::ranges::merge_result`.

Ao contrário de [std::pair](<#/doc/utility/pair>) e [std::tuple](<#/doc/utility/tuple>), este template de classe possui membros de dados com nomes significativos.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <cctype>
    #include <iostream>
    #include <iterator>
    #include <ranges>
    #include <string_view>
    
    void print(std::string_view rem, auto first, auto last)
    {
        for (std::cout << rem << ": { "; first != last; ++first)
            std::cout << *first << ' ';
        std::cout << "}\n";
    }
    
    int main()
    {
        constexpr std::string_view in {"TvEeNcStOoRr"};
        std::array<char, in.size()> o1, o2;
    
        const auto result = std::ranges::partition_copy(in, o1.begin(), o2.begin(),
             { return std::isupper(c); });
    
        print("in", in.begin(), result.in);
        print("o1", o1.begin(), result.out1);
        print("o2", o2.begin(), result.out2);
    }
```

Saída:
```
    in: { T v E e N c S t O o R r }
    o1: { T E N S O R }
    o2: { v e c t o r }
```

### Veja também

[ pair](<#/doc/utility/pair>) | implementa tupla binária, ou seja, um par de valores
(template de classe)
[ tuple](<#/doc/utility/tuple>)(C++11) | implementa container de tamanho fixo, que armazena elementos de tipos possivelmente diferentes
(template de classe)