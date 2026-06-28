# std::reference_converts_from_temporary

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T, class U >
struct reference_converts_from_temporary;
```

Seja `V` [std::remove_cv_t](<#/doc/types/remove_cv>)&lt;U&gt; se `U` for um tipo escalar ou _cv_ void, ou `U` caso contrário. Se `T` for um tipo de referência, e dada uma expressão hipotética e tal que decltype(e) seja `V`, a definição de variável `T ref = e;` for bem-formada e [vincular um objeto temporário](<#/doc/language/reference_initialization>) a `ref`, então fornece a constante membro `value` igual a true. Caso contrário, `value` é false.

Se `T` for um tipo de referência lvalue para um tipo de objeto qualificado como const- mas não volatile- ou um tipo de referência rvalue, ambos [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt; e [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt; devem ser [tipos completos](<#/doc/language/type-id>), _cv_ void, ou [arrays de limite desconhecido](<#/doc/language/array>); caso contrário, o comportamento é indefinido.

Se uma instanciação de um template acima depender, direta ou indiretamente, de um tipo incompleto, e essa instanciação puder produzir um resultado diferente se esse tipo fosse hipoteticamente completado, o comportamento é indefinido.

Se o programa adicionar especializações para `std::reference_converts_from_temporary` ou `std::reference_converts_from_temporary_v`, o comportamento é indefinido.

### Template de variável auxiliar

```cpp
template< class T, class U >
inline constexpr bool reference_converts_from_temporary_v =
std::reference_converts_from_temporary<T, U>::value;  // (desde C++23)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` for um tipo de referência, um valor `U` puder ser vinculado a `T` em inicialização por cópia, e um objeto temporário seria vinculado à referência, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Notas

`std::reference_converts_from_temporary` pode ser usado para rejeitar alguns casos que sempre produzem referências pendentes (dangling references).

### Exemplo

Execute este código
```cpp
    #include <type_traits>
     
    int main() {}
     
    static_assert(
        std::reference_converts_from_temporary_v<int&&, int> == true &&
        std::reference_converts_from_temporary_v<const int&, int> == true &&
        std::reference_converts_from_temporary_v<int&&, int&&> == false &&
        std::reference_converts_from_temporary_v<const int&, int&&> == false &&
        std::reference_converts_from_temporary_v<int&&, long&&> == true &&
        std::reference_converts_from_temporary_v<int&&, long> == true);
```

### Veja também

[ is_convertibleis_nothrow_convertible](<#/doc/types/is_convertible>)(C++11)(C++20) | verifica se um tipo pode ser convertido para o outro tipo
(class template)
[ invokeinvoke_r](<#/doc/utility/functional/invoke>)(C++17)(C++23) | invoca qualquer objeto [Callable](<#/doc/named_req/Callable>) com os argumentos fornecidos e possibilidade de especificar o tipo de retorno (desde C++23)
(function template)
[ bind](<#/doc/utility/functional/bind>)(C++11) | vincula um ou mais argumentos a um objeto de função
(function template)
[ visit](<#/doc/utility/variant/visit2>)(C++17) | chama o functor fornecido com os argumentos mantidos por um ou mais `variant`s
(function template)
[ (constructor)](<#/doc/utility/functional/function/function>) | constrói uma nova instância de `std::function`
(função membro pública de `std::function<R(Args...)>`)
[ (constructor)](<#/doc/utility/functional/move_only_function/move_only_function>) | constrói um novo objeto `std::move_only_function`
(função membro pública de `std::move_only_function`)
[ (constructor)](<#/doc/thread/packaged_task/packaged_task>) | constrói o objeto task
(função membro pública de `std::packaged_task<R(Args...)>`)