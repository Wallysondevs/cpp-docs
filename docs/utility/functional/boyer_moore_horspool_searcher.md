# std::boyer_moore_horspool_searcher

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class RandomIt1,
class Hash = std::hash<typename std::iterator_traits<RandomIt1>::value_type>,
class BinaryPredicate = std::equal_to<> >
class boyer_moore_horspool_searcher;
```

  
Um searcher adequado para uso com a sobrecarga [Searcher](<https://en.cppreference.com/mwiki/index.php?title=cpp/named_req/Searcher&action=edit&redlink=1> "cpp/named req/Searcher \(page does not exist\)") de [std::search](<#/doc/algorithm/search>) que implementa o [algoritmo de busca de string Boyer-Moore-Horspool](<https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore%E2%80%93Horspool_algorithm> "enwiki:Boyer–Moore–Horspool algorithm"). 

`std::boyer_moore_horspool_searcher` é [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>). 

`RandomIt1` deve atender aos requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>). 

### Funções membro

##  std::boyer_moore_horspool_searcher::boyer_moore_horspool_searcher

boyer_moore_horspool_searcher( RandomIt1 pat_first,  
RandomIt1 pat_last,  
Hash hf = Hash(),  
BinaryPredicate pred = BinaryPredicate() );

  
Constrói um `std::boyer_moore_horspool_searcher` armazenando cópias de pat_first, pat_last, hf e pred, configurando quaisquer estruturas de dados internas necessárias. 

O tipo de valor de `RandomIt1` deve ser [DefaultConstructible](<#/doc/named_req/DefaultConstructible>), [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>). 

Para quaisquer dois valores `A` e `B` do tipo [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;RandomIt1&gt;::value_type, se pred(A, B) == true, então hf(A) == hf(B) deve ser true. 

###  Parâmetros

pat_first, pat_last  |  \-  |  um par de iteradores que designam a string a ser buscada   
---|---|---
hf  |  \-  |  um objeto chamável usado para fazer hash dos elementos da string   
pred  |  \-  |  um objeto chamável usado para determinar a igualdade   
  
###  Exceções

Quaisquer exceções lançadas por 

  * o construtor de cópia de `RandomIt1`; 
  * o construtor padrão, construtor de cópia ou operador de atribuição de cópia do tipo de valor de `RandomIt1`; ou 
  * o construtor de cópia ou operador de chamada de função de `BinaryPredicate` ou `Hash`. 

Também pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a memória adicional necessária para as estruturas de dados internas não puder ser alocada. 

##  std::boyer_moore_horspool_searcher::operator()

template< class RandomIt2 >  
[std::pair](<#/doc/utility/pair>)<RandomIt2, RandomIt2> operator()( RandomIt2 first, RandomIt2 last ) const;

  
A função membro chamada pela sobrecarga Searcher de [std::search](<#/doc/algorithm/search>) para realizar uma busca com este searcher. `RandomIt2` deve atender aos requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>). 

`RandomIt1` e `RandomIt2` devem ter o mesmo tipo de valor. 

###  Parâmetros

first, last  |  \-  |  um par de iteradores que designam a string a ser examinada   
  
###  Valor de retorno

Se o padrão `[`pat_first`, `pat_last`)` estiver vazio, retorna [std::make_pair](<#/doc/utility/pair/make_pair>)(first, first). 

Caso contrário, retorna um par de iteradores para a primeira e uma posição após a última em `[`first`, `last`)` onde uma subsequência que se compara como igual a `[`pat_first`, `pat_last`)` conforme definido por pred está localizada, ou [std::make_pair](<#/doc/utility/pair/make_pair>)(last, last) caso contrário. 

### Notas

Macro de teste de recurso | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_boyer_moore_searcher`](<#/doc/feature_test>) | [`201603L`](<#/>) | (C++17) | [searchers](<#/doc/utility/functional>)  
  
### Exemplo

Run this code
```
    #include <algorithm>
    #include <functional>
    #include <iomanip>
    #include <iostream>
    #include <string_view>
     
    int main()
    {
        constexpr std::string_view in =
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed "
            "do eiusmod tempor incididunt ut labore et dolore magna aliqua";
     
        const std::string_view needle{"pisci"};
     
        auto it = std::search(in.begin(), in.end(),
                      std::boyer_moore_horspool_searcher(
                          needle.begin(), needle.end()));
        if (it != in.end())
            std::cout << "The string " << std::quoted(needle) << " found at offset "
                      << it - in.begin() << '\n';
        else
            std::cout << "The string " << std::quoted(needle) << " not found\n";
    }
```

Output: 
```
    The string "pisci" found at offset 43
```

### Veja também

[ search](<#/doc/algorithm/search>) | busca pela primeira ocorrência de um range de elementos   
(template de função)  
[ default_searcher](<#/doc/utility/functional/default_searcher>)(C++17) | implementação do algoritmo de busca da standard library C++   
(template de classe)  
[ boyer_moore_searcher](<#/doc/utility/functional/boyer_moore_searcher>)(C++17) | implementação do algoritmo de busca Boyer-Moore   
(template de classe)