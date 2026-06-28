# std::reverse_iterator&lt;Iter&gt;::operator=

template< class U >   
reverse_iterator& operator=( const reverse_iterator&lt;U&gt;& other ); |  | (constexpr desde C++17)  

  
Atribui other.`[current](<#/doc/iterator/reverse_iterator>)` a `[current](<#/doc/iterator/reverse_iterator>)`. 

Esta sobrecarga participa da resolução de sobrecarga apenas se `[std::is_same_v](<#/doc/types/is_same>)<U, Iter>` for falso e ambos `[std::convertible_to](<#/doc/concepts/convertible_to>)<const U&, Iter>` e `[std::assignable_from](<#/doc/concepts/assignable_from>)<Iter&, const U&>` forem modelados. `(desde C++20)`  
  
### Parâmetros

other  |  \-  |  adaptador de iterator a ser atribuído   
  
### Valor de retorno

*this

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
     
    int main()
    {
        const int a1[]{0, 1, 2};
        int a2[]{0, 1, 2, 3};
        short a3[]{40, 41, 42};
     
        std::reverse_iterator<const int*> it1{std::crbegin(a1)};
        it1 = std::reverse_iterator<int*>{std::rbegin(a2)};   // OK
    //  it1 = std::reverse_iterator<short*>{std::rbegin(a3)}; // Compilation error:
                                                              // incompatible pointer types
        std::reverse_iterator<const short*> it2{nullptr};
        it2 = std::rbegin(a3); // OK
    //  it2 = std::begin(a3);  // Compilation error: no viable operator= overload
        std::cout << *it2 << '\n';
    }
```

Saída: 
```
    42
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 280](<https://cplusplus.github.io/LWG/issue280>) | C++98  | atribuição heterogênea não era permitida  | permitida   
[LWG 3435](<https://cplusplus.github.io/LWG/issue3435>) | C++20  | o operador de atribuição de conversão não era restrito  | restrito   
  
### Veja também

[ (constructor)](<#/doc/iterator/reverse_iterator/reverse_iterator>) |  constrói um novo adaptador de iterator   
(função membro pública)  