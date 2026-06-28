# std::function&lt;R(Args...)&gt;::function

```cpp
function() noexcept;  // (1) (desde C++11)
function( std::nullptr_t ) noexcept;  // (2) (desde C++11)
function( const function& other );  // (3) (desde C++11)
  // (4)
function( function&& other );  // (desde C++11)
(até C++20)
function( function&& other ) noexcept;  // (desde C++20)
template< class F >
function( F&& f );  // (5) (desde C++11)
template< class Alloc >
function( std::allocator_arg_t, const Alloc& alloc ) noexcept;  // (6) (desde C++11)
(removido em C++17)
template< class Alloc >
function( std::allocator_arg_t, const Alloc& alloc,
std::nullptr_t ) noexcept;  // (7) (desde C++11)
(removido em C++17)
template< class Alloc >
function( std::allocator_arg_t, const Alloc& alloc,
const function& other );  // (8) (desde C++11)
(removido em C++17)
template< class Alloc >
function( std::allocator_arg_t, const Alloc& alloc,
function&& other );  // (9) (desde C++11)
(removido em C++17)
template< class F, class Alloc >
function( std::allocator_arg_t, const Alloc& alloc, F f );  // (10) (desde C++11)
(removido em C++17)
```

  
Constrói um `std::function` a partir de uma variedade de fontes.

1,2) Cria um `std::function` [vazio](<#/doc/utility/functional/function>).

3) Copia o [alvo](<#/doc/utility/functional/function>) de `other` para o alvo de `*this`.

Se `other` estiver vazio, `*this` também estará vazio logo após a chamada.

4) Move o alvo de `other` para o alvo de `*this`.

Se `other` estiver vazio, `*this` também estará vazio logo após a chamada.

`other` fica em um estado válido, mas não especificado, logo após a chamada.

5) Inicializa o alvo com [std::forward](<#/doc/utility/forward>)&lt;F&gt;(f). O alvo é do tipo [std::decay](<#/doc/types/decay>)&lt;F&gt;::type.

Se `f` for um ponteiro nulo para função, um ponteiro nulo para membro, ou um valor vazio de alguma especialização de `std::function`, `*this` estará vazio logo após a chamada.

Esta sobrecarga participa da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: 

  * [std::is_same_v](<#/doc/types/is_same>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;F&gt;, [std::function](<#/doc/utility/functional/function>)<R(Args...)> for falso. 

| (desde C++23)  
  
  * Um lvalue do tipo [std::decay](<#/doc/types/decay>)&lt;F&gt;::type é chamável para tipos de argumento `Args...` e tipo de retorno `R`. 

Se [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;F&gt;> ou [std::is_constructible_v](<#/doc/types/is_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;F&gt;, F> for falso, o programa é malformado.  | (desde C++23)  
  
Se `F` não for [CopyConstructible](<#/doc/named_req/CopyConstructible>), o comportamento é indefinido.

6-10) O mesmo que (1-5), exceto que `alloc` é usado para alocar memória para quaisquer estruturas de dados internas que o `std::function` possa usar.

Quando o alvo é um ponteiro para função ou um [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>), a otimização de objeto pequeno é garantida, ou seja, esses alvos são sempre armazenados diretamente dentro do objeto [std::function](<#/doc/utility/functional/function>), sem alocação dinâmica. Outros objetos grandes podem ser construídos em armazenamento alocado dinamicamente e acessados pelo objeto [std::function](<#/doc/utility/functional/function>) através de um ponteiro. 

### Parameters

other  |  \-  |  o objeto de função usado para inicializar `*this`  
---|---|---
f  |  \-  |  um objeto chamável usado para inicializar `*this`  
alloc  |  \-  |  um [Allocator](<#/doc/named_req/Allocator>) usado para alocação de memória interna   
Requisitos de tipo   
-`Alloc` deve satisfazer os requisitos de [Allocator](<#/doc/named_req/Allocator>).   
  
### Exceptions

3,8,9) Não lança exceção se o alvo de `other` for um ponteiro para função ou um [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>), caso contrário, pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) ou qualquer exceção lançada pelo construtor usado para copiar ou mover o objeto chamável armazenado.

4) Não lança exceção se o alvo de `other` for um ponteiro para função ou um [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>), caso contrário, pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) ou qualquer exceção lançada pelo construtor usado para copiar ou mover o objeto chamável armazenado. | (até C++20)  
  
5,10) Não lança exceção se `f` for um ponteiro para função ou um [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>), caso contrário, pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) ou qualquer exceção lançada pelo construtor de cópia do objeto chamável armazenado.

### Notes

O suporte a alocadores de `std::function` foi mal especificado e implementado de forma inconsistente. Algumas implementações não fornecem sobrecargas ([6-10](<#/doc/utility/functional/function/function>)) de forma alguma, algumas fornecem as sobrecargas, mas ignoram o argumento do alocador fornecido, e algumas fornecem as sobrecargas e usam o alocador fornecido para construção, mas não quando o `std::function` é reatribuído. Como resultado, o suporte a alocadores foi removido no C++17. 

### Example

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <utility>
    
    void print_num(int i) { std::cout << "print_num(" << i << ")\n"; }
    
    int main()
    {
        std::function<void(int)> func1; // (1) construtor vazio
        try
        {
            func1(333 << 1);
        }
        catch (const std::bad_function_call& ex)
        {
            std::cout << "1) " << ex.what() << '\n';
        }
    
        std::function<void(int)> func2{nullptr}; // (2) construtor vazio
        try
        {
            func1(222 * 3);
        }
        catch (const std::bad_function_call& ex)
        {
            std::cout << "2) " << ex.what() << '\n';
        }
    
        func1 = print_num; // inicializa func1 usando o operador de atribuição
    
        std::function<void(int)> func3{func1}; // (3) construtor de cópia
        func3(33);
    
        std::function<void(int)> func4{std::move(func3)}; // (4) construtor de movimento,
                                                          // func3 em estado não especificado
        func4(44);
    
        std::function<void(int)> func5{print_num}; // (5) construtor com função
        func5(55);
    
        // (5) construtor com lambda
        std::function<void(int)> func6( { std::cout << "lambda(" << i << ")\n"; });
        func6(66);
    }
```

Saída possível: 
```
    1) bad_function_call
    2) bad_function_call
    print_num(33)
    print_num(44)
    print_num(55)
    lambda(66)
```

### Defect reports

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2132](<https://cplusplus.github.io/LWG/issue2132>) | C++11  | sobrecargas ([5,10](<#/doc/utility/functional/function/function>)) podem ser ambíguas  | restrito   
[LWG 2774](<https://cplusplus.github.io/LWG/issue2774>) | C++11  | ([5,10](<#/doc/utility/functional/function/function>)) realizou um movimento adicional  | eliminado   
  
### See also

[ (construtor)](<#/doc/utility/functional/move_only_function/move_only_function>) |  constrói um novo objeto `std::move_only_function`   
(função membro pública de `std::move_only_function`)  