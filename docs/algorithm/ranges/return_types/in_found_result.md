# std::ranges::in_found_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class I >
struct in_found_result;
```

`ranges::in_found_result` é um template de classe que fornece uma maneira de armazenar um iterator e um flag booleano como uma única unidade.

Este template de classe não possui classes base ou membros declarados além dos mostrados abaixo. Assim, é adequado para uso com [structured bindings](<#/doc/language/structured_binding>).

Todas as funções membro especiais deste template de classe são implicitamente declaradas, o que torna as especializações [aggregate classes](<#/doc/language/aggregate_initialization>), e propaga a trivialidade, a capacidade de lançar exceções (potentially-throwing-ness) e a constexpr-ness das operações correspondentes nos membros de dados.

### Parâmetros de template

- **I** — o tipo do iterator que `ranges::in_found_result` armazena.

### Membros de dados

Nome do membro | Definição
---|---
in | um valor (que se supõe ser um iterator) do tipo `I`. É declarado com o atributo `[[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]`.
(objeto membro público)
found | um flag booleano (que pode indicar se um range apropriado pode ser encontrado) do tipo bool.
(objeto membro público)

### Funções membro

## std::ranges::in_found_result::operator in_found_result&lt;I2&gt;

```cpp
template<class I2>
requires std::convertible_to<const I&, I2>
constexpr operator in_found_result<I2>() const &;  // (1)
template<class I2>
requires std::convertible_to<I, I2>
constexpr operator in_found_result<I2>() &&;  // (2)
```

Converte *this para o resultado construindo cada membro de dados do resultado a partir do membro correspondente de *this.

1) Equivalente a return {in, found};.

2) Equivalente a return {std::move(in), found};.

### Biblioteca padrão

As seguintes funções da biblioteca padrão usam `ranges::in_found_result` como tipo de retorno:

##### Funções de algoritmo

---
[ ranges::next_permutation](<#/doc/algorithm/ranges/next_permutation>)(C++20) | gera a próxima permutação lexicográfica maior de um range de elementos
(objeto função de algoritmo)
[ ranges::prev_permutation](<#/doc/algorithm/ranges/prev_permutation>)(C++20) | gera a próxima permutação lexicográfica menor de um range de elementos
(objeto função de algoritmo)

### Sinopse
```cpp
    namespace std::ranges
    {
        template<class I>
        struct in_found_result
        {
            [[no_unique_address]] I in;
            bool found;
    
            template<class I2>
            requires std::convertible_to<const I&, I2>
            constexpr operator in_found_result<I2>() const &
            {
                return {in, found};
            }
    
            template<class I2>
            requires std::convertible_to<I, I2>
            constexpr operator in_found_result<I2>() &&
            {
                return {std::move(in), found};
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
    #include <iterator>
    #include <ranges>
    
    int main()
    {
        int v[] {1, 2, 3};
    
        const auto result = std::ranges::next_permutation(v);
    
        std::ranges::for_each(std::cbegin(v), result.in,  {std::cout << e << ' ';});
    
        std::cout << std::boolalpha << "\n" "result.found: " << result.found << '\n';
    }
```

Saída:
```
    1 3 2 
    result.found = true
```

### Veja também

[ pair](<#/doc/utility/pair>) | implementa tupla binária, ou seja, um par de valores
(template de classe)
[ tuple](<#/doc/utility/tuple>)(C++11) | implementa container de tamanho fixo, que armazena elementos de tipos possivelmente diferentes
(template de classe)