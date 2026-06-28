# std::declval

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< class T >
typename std::add_rvalue_reference<T>::type declval() noexcept;
(até C++14)
(apenas não avaliado)
template< class T >
std::add_rvalue_reference_t<T> declval() noexcept;
(apenas não avaliado)
```

Template auxiliar para escrever expressões que aparecem em [contextos não avaliados](<#/doc/language/expressions>), tipicamente o operando de [`decltype`](<#/doc/language/decltype>). Em um contexto não avaliado, este template auxiliar converte qualquer tipo `T` (que pode ser um tipo incompleto) em uma expressão desse tipo, tornando possível usar funções membro de T sem a necessidade de passar por construtores.

`std::declval` só pode ser usado em [contextos não avaliados](<#/doc/language/expressions>) e não é exigido que seja definido; é um erro avaliar uma expressão que contenha esta função. Formalmente, o programa é malformado se esta função for [odr-used](<#/doc/language/definition>).

### Parâmetros

(nenhum)

### Valor de retorno

Não pode ser avaliado e, portanto, nunca retorna um valor. O tipo de retorno é `T&&` (regras de colapso de referência se aplicam) a menos que `T` seja (possivelmente cv-qualificado) void, caso em que o tipo de retorno é `T`.

### Observações

`std::declval` é comumente usado em templates onde parâmetros de template aceitáveis podem não ter um construtor em comum, mas possuem a mesma função membro cujo tipo de retorno é necessário.

### Implementação possível
```cpp
    template<typename T>
    typename std::add_rvalue_reference<T>::type declval() noexcept
    {
        static_assert(false, "declval not allowed in an evaluated context");
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <utility>
    
    struct Default
    {
        int foo() const { return 1; }
    };
    
    struct NonDefault
    {
        NonDefault() = delete;
        int foo() const { return 1; }
    };
    
    int main()
    {
        decltype(Default().foo())               n1 = 1;     // type of n1 is int
        decltype(std::declval<Default>().foo()) n2 = 1;     // same
    
    //  decltype(NonDefault().foo())               n3 = n1; // error: no default constructor
        decltype(std::declval<NonDefault>().foo()) n3 = n1; // type of n3 is int
    
        std::cout << "n1 = " << n1 << '\n'
                  << "n2 = " << n2 << '\n'
                  << "n3 = " << n3 << '\n';
    }
```

Saída:
```
    n1 = 1
    n2 = 1
    n3 = 1
```

### Veja também

[ especificador decltype](<#/doc/language/decltype>)(C++11) | obtém o tipo de uma expressão ou de uma entidade
---|---
[ result_ofinvoke_result](<#/doc/types/result_of>)(C++11)(removido em C++20)(C++17) | deduz o tipo de resultado da invocação de um objeto chamável com um conjunto de argumentos
(template de classe)