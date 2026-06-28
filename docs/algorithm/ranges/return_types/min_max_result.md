# std::ranges::min_max_result

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`

```cpp
template< class T >
struct min_max_result;  // (desde C++20)
```

  
`ranges::min_max_result` é um template de classe que fornece uma maneira de armazenar dois objetos ou referências do mesmo tipo como uma única unidade. 

Este template de classe não possui classes base ou membros declarados além dos mostrados abaixo. Assim, é adequado para uso com [structured bindings](<#/doc/language/structured_binding>). 

Todas as funções membro especiais deste template de classe são implicitamente declaradas, o que torna as especializações [aggregate classes](<#/doc/language/aggregate_initialization>), e propaga a trivialidade, a capacidade de lançar exceções (potentially-throwing-ness) e a constexpr-ness das operações correspondentes nos membros de dados. 

### Parâmetros de template

T  |  \-  |  o tipo dos objetos ou referências que `ranges::min_max_result` armazena.   
  
### Membros de dados

Nome do membro  |  Definição   
---|---
min |  pode ser uma referência para, uma cópia de, ou um iterator do tipo `T` para um elemento mínimo em um range.   
(objeto membro público)  
max |  pode ser uma referência para, uma cópia de, ou um iterator do tipo `T` para um elemento máximo em um range   
(objeto membro público)  
  
Todos esses membros são declarados com o atributo `[[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]`. 

### Funções membro

##  std::ranges::min_max_result::operator min_max_result&lt;T2&gt;

```cpp
template<class T2>
requires std::convertible_to<const T&, T2>
constexpr operator min_max_result<T2>() const &;  // (1)
template<class T2>
requires std::convertible_to<T, T2>
constexpr operator min_max_result<T2>() &&;  // (2)
```

  
Converte *this para o resultado construindo cada membro de dados do resultado a partir do membro correspondente de *this. 

1) Equivalente a return {min, max};.

2) Equivalente a return {std::move(min), std::move(max)};. 

### Biblioteca padrão

As seguintes funções da biblioteca padrão usam `ranges::min_max_result` como tipo de retorno: 

#####  Funções de algoritmo   
  
---  
[ ranges::minmax](<#/doc/algorithm/ranges/minmax>)(C++20) |  retorna o menor e o maior de dois elementos  
(objeto função de algoritmo)  
[ ranges::minmax_element](<#/doc/algorithm/ranges/minmax_element>)(C++20) |  retorna os menores e os maiores elementos em um range  
(objeto função de algoritmo)  
  
###  Sinopse 
```cpp
    namespace std::ranges
    {
        template<class T>
        struct min_max_result
        {
            [[no_unique_address]] T min;
            [[no_unique_address]] T max;
    
            template<class T2>
            requires std::convertible_to<const T&, T2>
            constexpr operator min_max_result<T2>() const &
            {
                return {min, max};
            }
    
            template<class T2>
            requires std::convertible_to<T, T2>
            constexpr operator min_max_result<T2>() &&
            {
                return {std::move(min), std::move(max)};
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
    #include <ranges>
    
    int main()
    {
        constexpr static auto v = {3, 1, 4, 1, 5, 9, 2};
        {
            constexpr auto result = std::ranges::minmax(v);
            static_assert(1 == result.min && 9 == result.max);
        }
        {
            constexpr auto result = std::ranges::minmax_element(v);
            static_assert(1 == *result.min && 9 == *result.max);
        }
    }
```

### Veja também

[ pair](<#/doc/utility/pair>) |  implementa tupla binária, ou seja, um par de valores   
(template de classe)  
[ tuple](<#/doc/utility/tuple>)(C++11) |  implementa container de tamanho fixo, que armazena elementos de tipos possivelmente diferentes   
(template de classe)