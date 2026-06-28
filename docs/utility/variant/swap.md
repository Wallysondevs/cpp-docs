# std::variant&lt;Types...&gt;::swap

```cpp
void swap( variant& rhs ) noexcept(/* veja abaixo */);  // (desde C++17)
(constexpr desde C++20)
```

  
Troca dois objetos [`variant`](<#/doc/utility/variant>). 

  * Se ambos *this e rhs estiverem sem valor devido a uma exceção (valueless by exception), não faz nada. 
  * Caso contrário, se ambos *this e rhs contiverem a mesma alternativa, chama swap(*[std::get_if](<#/doc/utility/variant/get_if>)<i>(this), *[std::get_if](<#/doc/utility/variant/get_if>)<i>([std::addressof](<#/doc/memory/addressof>)(rhs))) onde i é [`index()`](<#/doc/utility/variant/index>). Se uma exceção for lançada, o estado dos valores depende da segurança de exceção da função `swap` chamada. 
  * Caso contrário, troca os valores de rhs e *this. Se uma exceção for lançada, o estado de *this e rhs depende da segurança de exceção do move constructor do variant. 

O programa é ill-formed a menos que o tipo `T_i` seja [Swappable](<#/doc/named_req/Swappable>) e [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)<T_i> seja verdadeiro para todos os `T_i` em `Types...`. 

### Parâmetros

rhs  |  \-  |  um objeto `variant` para trocar com   
  
### Valor de retorno

(nenhum) 

### Exceções

Se this->index() == rhs.index(), pode lançar qualquer exceção lançada por swap(*[std::get_if](<#/doc/utility/variant/get_if>)<i>(this), *[std::get_if](<#/doc/utility/variant/get_if>)<i>([std::addressof](<#/doc/memory/addressof>)(rhs))) com i sendo [`index()`](<#/doc/utility/variant/index>). 

Caso contrário, pode lançar qualquer exceção lançada pelos move constructors das alternativas atualmente contidas por *this e rhs. 

Especificação ` `noexcept` `: 

noexcept((([std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;Types&gt; &&  
[std::is_nothrow_swappable_v](<#/doc/types/is_swappable>)&lt;Types&gt;) && ...))

### Notas

```cpp
Teste de recurso  | Valor | Padrão | Recurso
`__cpp_lib_variant` | `202106L`  // (C++20)
(DR) | `std::variant` totalmente constexpr
```
  
### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <string>
    #include <variant>
     
    int main()
    {
        std::variant<int, std::string> v1{2}, v2{"abc"};
        std::visit( { std::cout << x << ' '; }, v1);
        std::visit( { std::cout << x << '\n'; }, v2);
        v1.swap(v2);
        std::visit( { std::cout << x << ' '; }, v1);
        std::visit( { std::cout << x << '\n'; }, v2);
    }
```

Saída: 
```
    2 abc
    abc 2
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P2231R1](<https://wg21.link/P2231R1>) | C++20  | `swap` não era constexpr enquanto destrutores não triviais podem ser constexpr em C++20  | tornada constexpr  
  
### Veja também

[ std::swap(std::variant)](<#/doc/utility/variant/swap2>)(C++17) |  especializa o algoritmo [std::swap](<#/doc/utility/swap>)   
(modelo de função)  