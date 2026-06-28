# std::variant&lt;Types...&gt;::emplace

```cpp
template< class T, class... Args >
T& emplace( Args&&... args );  // (1) (desde C++17)
(constexpr desde C++20)
template< class T, class U, class... Args >
T& emplace( std::initializer_list<U> il, Args&&... args );  // (2) (desde C++17)
(constexpr desde C++20)
template< std::size_t I, class... Args >
std::variant_alternative_t<I, variant>& emplace( Args&&... args );  // (3) (desde C++17)
(constexpr desde C++20)
template< std::size_t I, class U, class... Args >
std::variant_alternative_t<I, variant>&
emplace( std::initializer_list<U> il, Args&&... args );  // (4) (desde C++17)
(constexpr desde C++20)
```

  
Cria um novo valor no local, em um objeto `variant` existente 

1) Equivalente a emplace&lt;I&gt;([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...), onde `I` é o índice baseado em zero de `T` em `Types...`. 

  * Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<T, Args...> for true, e `T` ocorrer exatamente uma vez em `Types...`.

2) Equivalente a emplace&lt;I&gt;(il, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...), onde `I` é o índice baseado em zero de `T` em `Types...`. 

  * Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<T, [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt;&, Args...> for true, e `T` ocorrer exatamente uma vez em `Types...`.

3) Primeiro, destrói o valor atualmente contido (se houver). Em seguida, [inicializa diretamente](<#/doc/language/direct_initialization>) o valor contido como se estivesse construindo um valor do tipo `T_I` com os argumentos [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args).... Se uma exceção for lançada, *this pode se tornar [`valueless_by_exception`](<#/doc/utility/variant/valueless_by_exception>). 

  * Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<T_I, Args...> for true. 
  * É um erro em tempo de compilação se `I` não for menor que sizeof...(Types).

4) Primeiro, destrói o valor atualmente contido (se houver). Em seguida, [inicializa diretamente](<#/doc/language/direct_initialization>) o valor contido como se estivesse construindo um valor do tipo `T_I` com os argumentos il, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args).... Se uma exceção for lançada, *this pode se tornar [`valueless_by_exception`](<#/doc/utility/variant/valueless_by_exception>). 

  * Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<T_I, [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt;&, Args...> for true. 
  * É um erro em tempo de compilação se `I` não for menor que sizeof...(Types).

### Parâmetros

args  |  \-  |  argumentos do construtor a serem usados ao construir o novo valor   
---|---|---
il  |  \-  |  argumento initializer_list a ser usado ao construir o novo valor   
  
### Valor de retorno

Uma referência ao novo valor contido. 

### Exceções

1-4) Qualquer exceção lançada durante a inicialização do valor contido.

### Notas

```cpp
Macro de teste de recurso  | Valor | Std | Recurso
`__cpp_lib_variant` | `202106L`  // (C++20)
(DR) | `std::variant` totalmente constexpr (1-4)
```
  
### Exemplo

Execute este código
```
    #include <iostream>
    #include <string>
    #include <variant>
     
    int main()
    {
        std::variant<std::string> v1;
        v1.emplace<0>("abc"); // OK
        std::cout << std::get<0>(v1) << '\n';
        v1.emplace<std::string>("def"); // OK
        std::cout << std::get<0>(v1) << '\n';
     
        std::variant<std::string, std::string> v2;
        v2.emplace<1>("ghi"); // OK
        std::cout << std::get<1>(v2) << '\n';
        // v2.emplace<std::string>("abc"); -> Error
    }
```

Saída: 
```
    abc
    def
    ghi
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P2231R1](<https://wg21.link/P2231R1>) | C++20  | `emplace` não era constexpr enquanto as operações necessárias podem ser constexpr em C++20  | tornado constexpr  
  
### Veja também

[ operator=](<#/>) |  atribui um `variant`   
(função membro pública)  