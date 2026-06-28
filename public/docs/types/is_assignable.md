# std::is_assignable, std::is_trivially_assignable, std::is_nothrow_assignable

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T, class U >
struct is_assignable;
template< class T, class U >
struct is_trivially_assignable;
template< class T, class U >
struct is_nothrow_assignable;
```

  
1) Se a expressão [std::declval](<#/doc/utility/declval>)&lt;T&gt;() = [std::declval](<#/doc/utility/declval>)&lt;U&gt;() for bem-formada em contexto não avaliado, fornece a constante membro `value` igual a `true`. Caso contrário, `value` é `false`. [Verificações de acesso](<#/doc/language/access>) são realizadas como se fossem de um contexto não relacionado a nenhum dos tipos.

2) O mesmo que (1), mas a avaliação da expressão de atribuição não chamará nenhuma operação que não seja trivial. Para os propósitos desta verificação, uma chamada para [std::declval](<#/doc/utility/declval>) é considerada trivial e não é considerada um [uso ODR](<#/doc/language/definition>) de [std::declval](<#/doc/utility/declval>).

3) O mesmo que (1), mas a avaliação da expressão de atribuição não chamará nenhuma operação que não seja `noexcept`.

Se `T` ou `U` não for um tipo completo, (possivelmente cv-qualificado) `void`, ou um array de limite desconhecido, o comportamento é indefinido. 

Se uma instanciação de um template acima depender, direta ou indiretamente, de um tipo incompleto, e essa instanciação puder produzir um resultado diferente se esse tipo fosse hipoteticamente completado, o comportamento é indefinido. 

Se o programa adicionar especializações para qualquer um dos templates descritos nesta página, o comportamento é indefinido. 

### Templates de variáveis auxiliares

```cpp
template< class T, class U >
constexpr bool is_assignable_v = is_assignable<T, U>::value;  // (desde C++17)
template< class T, class U >
constexpr bool is_trivially_assignable_v = is_trivially_assignable<T, U>::value;  // (desde C++17)
template< class T, class U >
constexpr bool is_nothrow_assignable_v = is_nothrow_assignable<T, U>::value;  // (desde C++17)
```

  
##  Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

###  Constantes membro

value[static] |  `true` se `T` é atribuível a partir de `U`, `false` caso contrário   
(constante membro estática pública)  
  
###  Funções membro

operator bool |  converte o objeto para `bool`, retorna `value`   
(função membro pública)  
operator()(C++14) |  retorna `value`   
(função membro pública)  
  
###  Tipos membro

Tipo  |  Definição   
---|---
`value_type` |  `bool`  
`type` |  [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>  
  
### Notas

Este trait não verifica nada fora do contexto imediato da expressão de atribuição: se o uso de `T` ou `U` disparar especializações de template, geração de funções membro especiais definidas implicitamente etc., e essas tiverem erros, a atribuição real pode não compilar mesmo que `std::is_assignable<T,U>::value` compile e avalie para `true`. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <string>
    #include <type_traits>
     
    struct Ex1 { int n; };
     
    int main()
    {
        std::cout << std::boolalpha
                  << "int is assignable from int? "
                  << std::is_assignable<int, int>::value << '\n' // 1 = 1; wouldn't compile
                  << "int& is assignable from int? "
                  << std::is_assignable<int&, int>::value << '\n' // int a; a = 1; works
                  << "int is assignable from double? "
                  << std::is_assignable<int, double>::value << '\n'
                  << "int& is nothrow assignable from double? "
                  << std::is_nothrow_assignable<int&, double>::value << '\n'
                  << "string is assignable from double? "
                  << std::is_assignable<std::string, double>::value << '\n'
                  << "Ex1& is trivially assignable from const Ex1&? "
                  << std::is_trivially_assignable<Ex1&, const Ex1&>::value << '\n';
    }
```

Saída: 
```
    int is assignable from int? false
    int& is assignable from int? true
    int is assignable from double? false
    int& is nothrow assignable from double? true
    string is assignable from double? true
    Ex1& is trivially assignable from const Ex1&? true
```

### Veja também

[ is_copy_assignableis_trivially_copy_assignableis_nothrow_copy_assignable](<#/doc/types/is_copy_assignable>)(C++11)(C++11)(C++11) |  verifica se um tipo possui um operador de atribuição de cópia   
(template de classe)  
[ is_move_assignableis_trivially_move_assignableis_nothrow_move_assignable](<#/doc/types/is_move_assignable>)(C++11)(C++11)(C++11) |  verifica se um tipo possui um operador de atribuição de movimento   
(template de classe)  
[ assignable_from](<#/doc/concepts/assignable_from>)(C++20) |  especifica que um tipo é atribuível a partir de outro tipo   
(concept)