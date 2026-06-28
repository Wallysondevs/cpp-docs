# std::has_virtual_destructor

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct has_virtual_destructor;
```

`std::has_virtual_destructor` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é um tipo com um destrutor virtual, a característica base é [std::true_type](<#/doc/types/integral_constant>). Para qualquer outro tipo, a característica base é [std::false_type](<#/doc/types/integral_constant>).

Se `T` é um tipo de classe incompleto que não é uma union, o comportamento é indefinido.

Se o programa adicionar especializações para `std::has_virtual_destructor` ou `std::has_virtual_destructor_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool has_virtual_destructor_v = has_virtual_destructor<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | verdadeiro se `T` possui um destrutor virtual, falso caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna o valor
(função membro pública)
operator()(C++14) | retorna o valor
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Observações

Se uma classe `C` possui um destrutor virtual público, ela pode ser derivada, e o objeto derivado pode ser seguramente deletado através de um ponteiro para o objeto base ([GotW #18](<http://www.gotw.ca/publications/mill18.htm>)). Neste caso, `std::is_polymorphic`&lt;C&gt;::value é verdadeiro.

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    struct S {};
    static_assert(!std::has_virtual_destructor_v<S>);
    
    struct B { virtual ~B() {} };
    static_assert(std::has_virtual_destructor_v<B>);
    
    struct D : B { ~D() {} };
    static_assert(std::has_virtual_destructor_v<D>);
    
    int main()
    {
        B* pd = new D;
        delete pd;
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2015](<https://cplusplus.github.io/LWG/issue2015>) | C++11 | o comportamento era indefinido se
`T` fosse um tipo union incompleto | a característica base é
[std::false_type](<#/doc/types/integral_constant>) neste caso

### Veja também

[ is_destructibleis_trivially_destructibleis_nothrow_destructible](<#/doc/types/is_destructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um destrutor não deletado
(template de classe)
[ is_polymorphic](<#/doc/types/is_polymorphic>)(C++11) | verifica se um tipo é um tipo de classe polimórfica
(template de classe)