# std::ranges::copy_n, std::ranges::copy_n_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I, std::weakly_incrementable O >
requires std::indirectly_copyable<I, O>
constexpr copy_n_result<I, O>
copy_n( I first, std::iter_difference_t<I> n, O result );
Tipo auxiliar
template< class I, class O >
using copy_n_result = ranges::in_out_result<I, O>;
```

  
1) Copia exatamente n valores do range que começa em `first` para o range que começa em `result`, realizando `*(result + i) = *(first + i)` para cada inteiro em `[`​0​`, `n`)`. O comportamento é indefinido se `result` estiver dentro do range `[`first`, `first + n`)` ([ranges::copy_backward](<#/doc/algorithm/ranges/copy_backward>) pode ser usado em vez disso neste caso).

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja: 

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles. 
  * Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>). 
  * Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida. 

### Parâmetros

first  |  \-  |  o início do range de elementos a serem copiados   
---|---|---
n  |  \-  |  número de elementos a serem copiados   
result  |  \-  |  o início do range de destino   
  
### Valor de retorno

`ranges::copy_n_result{first + n, result + n}` ou, mais formalmente, um valor do tipo [ranges::in_out_result](<#/doc/algorithm/ranges/return_types/in_out_result>) que contém um iterator [std::input_iterator](<#/doc/iterator/input_iterator>) igual a [ranges::next](<#/doc/iterator/ranges/next>)(first, n) e um iterator [std::weakly_incrementable](<#/doc/iterator/weakly_incrementable>) igual a [ranges::next](<#/doc/iterator/ranges/next>)(result, n). 

### Complexidade

Exatamente n atribuições. 

### Notas

Na prática, implementações de `std::ranges::copy_n` podem evitar múltiplas atribuições e usar funções de cópia em massa como [std::memmove](<#/doc/string/byte/memmove>) se o tipo de valor for [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) e os tipos de iterator satisfizerem [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>). Alternativamente, tal aceleração de cópia pode ser injetada durante uma fase de otimização de um compilador. 

Ao copiar ranges sobrepostos, `std::ranges::copy_n` é apropriado ao copiar para a esquerda (o início do range de destino está fora do range de origem), enquanto `std::ranges::copy_backward` é apropriado ao copiar para a direita (o fim do range de destino está fora do range de origem). 

### Possível implementação
```cpp
    struct copy_n_fn
    {
        template<std::input_iterator I, std::weakly_incrementable O>
        requires std::indirectly_copyable<I, O>
        constexpr ranges::copy_n_result<I, O>
            operator()(I first, std::iter_difference_t<I> n, O result) const
        {
            for (std::iter_difference_t<I> i {}; i != n; ++i, ++first, ++result)
                *result = *first;
            return {std::move(first), std::move(result)};
        }
    };
     
    inline constexpr copy_n_fn copy_n {};
```
  
---  
  
### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <string>
    #include <string_view>
     
    int main()
    {
        const std::string_view in {"ABCDEFGH"};
        std::string out;
     
        std::ranges::copy_n(in.begin(), 4, std::back_inserter(out));
        std::cout << std::quoted(out) << '\n';
     
        out = "abcdefgh";
        const auto res = std::ranges::copy_n(in.begin(), 5, out.begin());
        std::cout
            << "*(res.in): '" << *(res.in) << "', distance: "
            << std::distance(std::begin(in), res.in) << '\n'
            << "*(res.out): '" << *(res.out) << "', distance: "
            << std::distance(std::begin(out), res.out) << '\n';
    }
```

Saída: 
```
    "ABCD"
    *(res.in): 'F', distance: 5
    *(res.out): 'f', distance: 5
```

### Ver também

[ ranges::copyranges::copy_if](<#/doc/algorithm/ranges/copy>)(C++20)(C++20) |  copia um range de elementos para um novo local  
(objeto de função de algoritmo)  
[ ranges::copy_backward](<#/doc/algorithm/ranges/copy_backward>)(C++20) |  copia um range de elementos em ordem inversa  
(objeto de função de algoritmo)  
[ ranges::remove_copyranges::remove_copy_if](<#/doc/algorithm/ranges/remove_copy>)(C++20)(C++20) |  copia um range de elementos omitindo aqueles que satisfazem critérios específicos  
(objeto de função de algoritmo)  
[ ranges::replace_copyranges::replace_copy_if](<#/doc/algorithm/ranges/replace_copy>)(C++20)(C++20) |  copia um range, substituindo elementos que satisfazem critérios específicos por outro valor  
(objeto de função de algoritmo)  
[ ranges::reverse_copy](<#/doc/algorithm/ranges/reverse_copy>)(C++20) |  cria uma cópia de um range que é invertido  
(objeto de função de algoritmo)  
[ ranges::rotate_copy](<#/doc/algorithm/ranges/rotate_copy>)(C++20) |  copia e rotaciona um range de elementos  
(objeto de função de algoritmo)  
[ ranges::unique_copy](<#/doc/algorithm/ranges/unique_copy>)(C++20) |  cria uma cópia de um range de elementos que não contém duplicatas consecutivas  
(objeto de função de algoritmo)  
[ ranges::move](<#/doc/algorithm/ranges/move>)(C++20) |  move um range de elementos para um novo local  
(objeto de função de algoritmo)  
[ ranges::move_backward](<#/doc/algorithm/ranges/move_backward>)(C++20) |  move um range de elementos para um novo local em ordem inversa  
(objeto de função de algoritmo)  
[ copy_n](<#/doc/algorithm/copy_n>)(C++11) |  copia um número de elementos para um novo local   
(template de função)