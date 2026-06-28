# std::ranges::shift_left, std::ranges::shift_right

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::permutable I, std::sentinel_for<I> S >
constexpr ranges::subrange<I>
shift_left( I first, S last, std::iter_difference_t<I> n );
template< ranges::forward_range R >
requires std::permutable<ranges::iterator_t<R>>
constexpr ranges::borrowed_subrange_t<R>
shift_left( R&& r, ranges::range_difference_t<R> n );
template< std::permutable I, std::sentinel_for<I> S >
constexpr ranges::subrange<I>
shift_right( I first, S last, std::iter_difference_t<I> n );
template< ranges::forward_range R >
requires std::permutable<ranges::iterator_t<R>>
constexpr ranges::borrowed_subrange_t<R>
shift_right( R&& r, ranges::range_difference_t<R> n );
```

  
Desloca os elementos no range `[`first`, `last`)` ou r por `n` posições. O comportamento é indefinido se `[`first`, `last`)` não for um range válido.

1) Desloca os elementos em direção ao início do range: 

  * Se n == 0 || n >= last - first, não há efeitos. 
  * Se n < 0, o comportamento é indefinido. 
  * Caso contrário, para cada inteiro `i` em `[`​0​`, `last - first - n`)`, move o elemento originalmente na posição first + n + i para a posição first + i. As movimentações são realizadas em ordem crescente de `i` começando de ​0​.

3) Desloca os elementos em direção ao final do range: 

  * Se n == 0 || n >= last - first, não há efeitos. 
  * Se n < 0, o comportamento é indefinido. 
  * Caso contrário, para cada inteiro `i` em `[`​0​`, `last - first - n`)`, move o elemento originalmente na posição first + i para a posição first + n + i. Se `I` modela [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>), então as movimentações são realizadas em ordem decrescente de `i` começando de last - first - n - 1.

2,4) O mesmo que (1) ou (3) respectivamente, mas usa r como o range, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

Elementos que estão no range original, mas não no novo range, são deixados em um estado válido, mas não especificado. 

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidas como _niebloids_), ou seja: 

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas. 
  * Nenhuma delas é visível para [pesquisa dependente de argumento](<#/doc/language/adl>). 
  * Quando qualquer uma delas é encontrada por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida. 

### Parâmetros

first  |  \-  |  o início do range original   
---|---|---
last  |  \-  |  o final do range original   
r  |  \-  |  o range de elementos a serem deslocados   
n  |  \-  |  o número de posições para deslocar   
  
### Valor de retorno

1,2) {first, /*NOVO_FINAL*/}, onde `_NOVO_FINAL_` é o final do range resultante e equivalente a: 

  * first + (last - first - n), se `n` for menor que last - first; 
  * first caso contrário.

3,4) {/*NOVO_INICIO*/, last}, onde `_NOVO_INICIO_` é o início do range resultante e equivalente a: 

  * first + n, se `n` for menor que last - first; 
  * last caso contrário.

### Complexidade

1,2) No máximo [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) - n atribuições.

3,4) No máximo [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) - n atribuições ou trocas.

### Notas

`ranges::shift_left` / `ranges::shift_right` tem melhor eficiência em implementações comuns se `I` modela [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>) ou (melhor) [`random_access_iterator`](<#/doc/iterator/random_access_iterator>). 

Implementações (por exemplo, [MSVC STL](<https://github.com/microsoft/STL/blob/main/stl/src/vector_algorithms.cpp>)) podem habilitar a vetorização quando o tipo de iterator modela [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>) e a troca de seu tipo de valor não chama nenhuma função membro especial não trivial nem `swap` encontrado por [ADL](<#/doc/language/adl>). 

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_shift`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | [`std::ranges::shift_left`](<#/doc/algorithm/ranges/shift>) e [`std::ranges::shift_right`](<#/doc/algorithm/ranges/shift>)  
  
### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <string>
    #include <type_traits>
    #include <vector>
    
    struct S
    {
        int value{0};
        bool specified_state{true};
    
        S(int v = 0) : value{v} {}
        S(S const& rhs) = default;
        S(S&& rhs) { *this = std::move(rhs); }
        S& operator=(S const& rhs) = default;
        S& operator=(S&& rhs)
        {
            if (this != &rhs)
            {
                value = rhs.value;
                specified_state = rhs.specified_state;
                rhs.specified_state = false;
            }
            return *this;
        }
    };
    
    template<typename T>
    std::ostream& operator<<(std::ostream& os, std::vector<T> const& v)
    {
        for (const auto& s : v)
        {
            if constexpr (std::is_same_v<T, S>)
                s.specified_state ? os << s.value << ' ' : os << ". ";
            else if constexpr (std::is_same_v<T, std::string>)
                os << (s.empty() ? "." : s) << ' ';
            else
                os << s << ' ';
        }
        return os;
    }
    
    int main()
    {
        std::cout << std::left;
    
        std::vector<S> a{1, 2, 3, 4, 5, 6, 7};
        std::vector<int> b{1, 2, 3, 4, 5, 6, 7};
        std::vector<std::string> c{"α", "β", "γ", "δ", "ε", "ζ", "η"};
    
        std::cout << "vector<S> \tvector<int> \tvector<string>\n";
        std::cout << a << "  " << b << "  " << c << '\n';
    
        std::ranges::shift_left(a, 3);
        std::ranges::shift_left(b, 3);
        std::ranges::shift_left(c, 3);
        std::cout << a << "  " << b << "  " << c << '\n';
    
        std::ranges::shift_right(a, 2);
        std::ranges::shift_right(b, 2);
        std::ranges::shift_right(c, 2);
        std::cout << a << "  " << b << "  " << c << '\n';
    
        std::ranges::shift_left(a, 8); // has no effect: n >= last - first
        std::ranges::shift_left(b, 8); // ditto
        std::ranges::shift_left(c, 8); // ditto
        std::cout << a << "  " << b << "  " << c << '\n';
    
    //  std::ranges::shift_left(a, -3); // UB
    }
```

Saída possível: 
```
    vector<S>       vector<int>     vector<string>
    1 2 3 4 5 6 7   1 2 3 4 5 6 7   α β γ δ ε ζ η
    4 5 6 7 . . .   4 5 6 7 5 6 7   δ ε ζ η . . .
    . . 4 5 6 7 .   4 5 4 5 6 7 5   . . δ ε ζ η .
    . . 4 5 6 7 .   4 5 4 5 6 7 5   . . δ ε ζ η .
```

### Veja também

[ ranges::move](<#/doc/algorithm/ranges/move>)(C++20) |  move um range de elementos para um novo local  
(objeto de função de algoritmo)  
[ ranges::move_backward](<#/doc/algorithm/ranges/move_backward>)(C++20) |  move um range de elementos para um novo local em ordem inversa  
(objeto de função de algoritmo)  
[ ranges::rotate](<#/doc/algorithm/ranges/rotate>)(C++20) |  rotaciona a ordem dos elementos em um range  
(objeto de função de algoritmo)  
[ shift_leftshift_right](<#/doc/algorithm/shift>)(C++20) |  desloca elementos em um range   
(template de função)