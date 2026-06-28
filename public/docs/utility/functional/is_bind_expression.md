# std::is_bind_expression

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T >
struct is_bind_expression;
```

Se `T` é um tipo produzido por uma chamada a [std::bind](<#/doc/utility/functional/bind>) (mas não [std::bind_front](<#/doc/utility/functional/bind_front>) ou [std::bind_back](<#/doc/utility/functional/bind_front>)), este template é derivado de [std::true_type](<#/doc/types/integral_constant>). Para qualquer outro tipo (a menos que especializado pelo usuário), este template é derivado de [std::false_type](<#/doc/types/integral_constant>).

Um programa pode especializar este template para um [tipo definido pelo programa](<#/doc/language/type-id>) `T` para implementar [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>) com característica base de [std::true_type](<#/doc/types/integral_constant>) para indicar que `T` deve ser tratado por [std::bind](<#/doc/utility/functional/bind>) como se fosse o tipo de uma subexpressão de bind: quando um objeto de função gerado por bind é invocado, um argumento ligado deste tipo será invocado como um objeto de função e receberá todos os argumentos não ligados passados para o objeto gerado por bind.

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_bind_expression_v = is_bind_expression<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um objeto de função gerado por [std::bind](<#/doc/utility/functional/bind>), false caso contrário
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

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <type_traits>
    
    struct MyBind
    {
        typedef int result_type;
        int operator()(int a, int b) const { return a + b; }
    };
    
    namespace std
    {
        template<>
        struct is_bind_expression<MyBind> : public true_type {};
    }
    
    int f(int n1, int n2)
    {
        return n1 + n2;
    }
    
    int main()
    {
        // as if bind(f, bind(MyBind(), _1, _2), 2)
        auto b = std::bind(f, MyBind(), 2); 
    
        std::cout << "Adding 2 to the sum of 10 and 11 gives " << b(10, 11) << '\n';
    }
```

Saída:
```
    Adding 2 to the sum of 10 and 11 gives 23
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 2010](<https://cplusplus.github.io/LWG/issue2010>) | C++11 | especializações definidas pelo programa podiam ser derivadas apenas de [std::false_type](<#/doc/types/integral_constant>) | podem ser derivadas de [std::true_type](<#/doc/types/integral_constant>)

### Veja também

[ bind](<#/doc/utility/functional/bind>)(C++11) | liga um ou mais argumentos a um objeto de função
(template de função)