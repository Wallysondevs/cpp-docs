# std::initializer_list

(não confundir com [lista de inicializadores de membro](<#/doc/language/initializer_list>))  
  
Definido no cabeçalho `[<initializer_list>](<#/doc/header/initializer_list>)`

```c
template< class T >
class initializer_list;
```

  
Um objeto do tipo `std::initializer_list<T>` é um objeto proxy leve que fornece acesso a um array de objetos do tipo const T (que pode ser alocado em memória somente leitura). 

Um objeto `std::initializer_list` é automaticamente construído quando: 

  * uma [lista de inicializadores entre chaves](<#/doc/language/initialization>) é usada para [inicializar por lista](<#/doc/language/list_initialization>) um objeto, onde o construtor correspondente aceita um parâmetro `std::initializer_list`, 
  * uma lista de inicializadores entre chaves é usada como operando direito de [atribuição](<#/doc/language/operator_assignment>) ou como um [argumento de chamada de função](<#/doc/language/overload_resolution>), e o operador de atribuição/função correspondente aceita um parâmetro `std::initializer_list`, 
  * uma lista de inicializadores entre chaves é vinculada a [`auto`](<#/doc/language/auto>), inclusive em um [loop for baseado em range](<#/doc/language/range-for>). 

`std::initializer_list` pode ser implementado como um par de ponteiros ou um ponteiro e um comprimento. Copiar um `std::initializer_list` não copia o [array de suporte](<#/doc/language/list_initialization>) da lista de inicializadores correspondente. 

O programa é malformado se uma especialização explícita ou parcial de `std::initializer_list` for declarada. 

### Member types

Name  |  Definição   
---|---
`value_type` |  `T`  
`reference` |  const T&  
`const_reference` |  const T&  
`size_type` |  [std::size_t](<#/doc/types/size_t>)  
`iterator` |  const T*  
`const_iterator` |  const T*  
  
### Member functions

[ (construtor)](<#/doc/utility/initializer_list/initializer_list>) |  cria uma lista de inicializadores vazia   
(função membro pública)  
  
#####  Capacidade   
  
[ size](<#/doc/utility/initializer_list/size>) |  retorna o número de elementos na lista de inicializadores   
(função membro pública)  
  
#####  Iteradores   
  
[ begin](<#/doc/utility/initializer_list/begin>) |  retorna um ponteiro para o primeiro elemento   
(função membro pública)  
[ end](<#/doc/utility/initializer_list/end>) |  retorna um ponteiro para um elemento após o último   
(função membro pública)  
  
### Funções não-membro

[ std::begin(std::initializer_list)](<#/doc/utility/initializer_list/begin2>)(C++11) |  sobrecarrega [std::begin](<#/doc/iterator/begin>)   
(modelo de função)  
[ std::end(std::initializer_list)](<#/doc/utility/initializer_list/end2>)(C++11) |  especializa [std::end](<#/doc/iterator/end>)   
(modelo de função)  
  
#####  Modelos de função livres sobrecarregados para `std::initializer_list`  
  
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) |  retorna um iterador reverso para o início de um container ou array   
(modelo de função)  
[ rendcrend](<#/doc/iterator/rend>)(C++14) |  retorna um iterador reverso de fim para um container ou array   
(modelo de função)  
[ empty](<#/doc/iterator/empty>)(C++17) |  verifica se o container está vazio   
(modelo de função)  
[ data](<#/doc/iterator/data>)(C++17) |  obtém o ponteiro para o array subjacente   
(modelo de função)  
  
### Notas

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_initializer_lists`](<#/doc/feature_test>) | [`200806L`](<#/>) | (C++11) | [Inicialização por lista](<#/doc/language/list_initialization>) e `std::initializer_list`  
  
### Exemplo

Run this code
```
    #include <cassert>
    #include <initializer_list>
    #include <iostream>
    #include <vector>
     
    template<class T>
    struct S
    {
        std::vector<T> v;
     
        S(std::initializer_list<T> l) : v(l)
        {
             std::cout << "constructed with a " << l.size() << "-element list\n";
        }
     
        void append(std::initializer_list<T> l)
        {
            v.insert(v.end(), l.begin(), l.end());
        }
     
        std::pair<const T*, std::size_t> c_arr() const
        {
            return {&v[0], v.size()}; // copy list-initialization in return statement
                                      // this is NOT a use of std::initializer_list
        }
    };
     
    template<typename T>
    void templated_fn(T) {}
     
    int main()
    {
        S<int> s = {1, 2, 3, 4, 5}; // copy list-initialization
        s.append({6, 7, 8});        // list-initialization in function call
     
        std::cout << "The vector now has " << s.c_arr().second << " ints:\n";    
        for (auto n : s.v)
            std::cout << n << ' ';
        std::cout << '\n';
     
        std::cout << "Range-for over brace-init-list: \n";
        for (int x : {-1, -2, -3}) // the rule for auto makes this ranged-for work
            std::cout << x << ' ';
        std::cout << '\n';
     
        auto al = {10, 11, 12}; // special rule for auto
        std::cout << "The list bound to auto has size() = " << al.size() << '\n';
        auto la = al; // a shallow-copy of top-level proxy object
        assert(la.begin() == al.begin()); // guaranteed: backing array is the same
     
        std::initializer_list<int> il{-3, -2, -1};
        assert(il.begin()[2] == -1); // note the replacement for absent operator[]
        il = al; // shallow-copy
        assert(il.begin() == al.begin()); // guaranteed
     
    //  templated_fn({1, 2, 3}); // compiler error! "{1, 2, 3}" is not an expression,
                                 // it has no type, and so T cannot be deduced
        templated_fn<std::initializer_list<int>>({1, 2, 3}); // OK
        templated_fn<std::vector<int>>({1, 2, 3});           // also OK
    }
```

Output: 
```
    constructed with a 5-element list
    The vector now has 8 ints:
    1 2 3 4 5 6 7 8
    Range-for over brace-init-list:
    -1 -2 -3
    The list bound to auto has size() = 3
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 2129](<https://cplusplus.github.io/LWG/issue2129>) | C++11  | `std::initializer_list` poderia ter especializações explícitas ou parciais  | o programa é malformado neste caso   
  
### Ver também

[ span](<#/doc/container/span>)(C++20) |  uma view não-proprietária sobre uma sequência contígua de objetos   
(modelo de classe)  
[ basic_string_view](<#/doc/string/basic_string_view>)(C++17) |  view de string somente leitura   
(modelo de classe)