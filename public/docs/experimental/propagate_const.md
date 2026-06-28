# std::experimental::propagate_const

Definido no cabeçalho `[<experimental/propagate_const>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/propagate_const&action=edit&redlink=1> "cpp/header/experimental/propagate const \(page does not exist\)")

```c
template< class T >
class propagate_const;
```

`std::experimental::propagate_const` é um wrapper de propagação de const para ponteiros e objetos tipo ponteiro. Ele trata o ponteiro encapsulado como um ponteiro para `const` quando acessado através de um caminho de acesso `const`, daí o nome.

A classe satisfaz os requisitos de [MoveConstructible](<#/doc/named_req/MoveConstructible>) e [MoveAssignable](<#/doc/named_req/MoveAssignable>) se o tipo tipo ponteiro subjacente satisfizer o requisito correspondente, mas `propagate_const` não é nem [CopyConstructible](<#/doc/named_req/CopyConstructible>) nem [CopyAssignable](<#/doc/named_req/CopyAssignable>).

Requisitos de tipo
---
-`T` deve ser um tipo ponteiro para objeto não qualificado por cv ou um tipo de classe tipo ponteiro não qualificado por cv, conforme especificado abaixo.

### Requisitos para tipos de classe tipo ponteiro

Se `T` for um tipo de classe, ele deve satisfazer os requisitos nesta subseção.

Dado

  * `t`, uma [expressão lvalue](<#/doc/language/value_category>) modificável do tipo `T`,
  * `ct`, um lvalue do tipo const T que denota o mesmo objeto que `t` (equivalente a [std::as_const](<#/doc/utility/as_const>)(t) desde C++17),
  * `element_type`, um tipo de objeto.

As seguintes expressões devem ser válidas e ter seus efeitos especificados:

Expressão | Tipo de retorno | Pré-condições | Semântica operacional
---|---|---|---
t.get() | element_type*
ct.get() | element_type* or const element_type* | | t.get() == ct.get()
*t | element_type& | t.get() != nullptr | *t se refere ao mesmo objeto que *(t.get())
*ct | element_type& or const element_type& | ct.get() != nullptr | *ct se refere ao mesmo objeto que *(ct.get())
t.operator->() | element_type* | t.get() != nullptr | t.operator->() == t.get()
ct.operator->() | element_type* or const element_type* | ct.get() != nullptr | ct.operator->() == ct.get()
(bool)t | bool | | (bool)t é equivalente a t.get() != nullptr
(bool)ct | bool | | (bool)ct é equivalente a ct.get() != nullptr

Além disso, `T` e const T devem ser contextualmente conversíveis para bool.

Adicionalmente, se `T` for implicitamente conversível para element_type*, então (element_type*)t deve ser igual a t.get(). Similarmente, se const T for implicitamente conversível para const element_type*, então (const element_type*)ct deve ser igual a ct.get().

### Tipos de membros

Tipo de membro | Definição
---|---
element_type | [std::remove_reference_t](<#/doc/types/remove_reference>)<decltype(*[std::declval](<#/doc/utility/declval>)<T&>())>, o tipo do objeto apontado por `T`

### Funções membro

[ (construtor)](<#/doc/experimental/propagate_const/propagate_const>) | constrói um novo `propagate_const`
(função membro pública)
(destrutor)(implicitamente declarado) | destrói um `propagate_const`, destruindo o ponteiro contido
(função membro pública)
[ operator=](<#/>) | atribui o objeto `propagate_const`
(função membro pública)
[ swap](<#/doc/experimental/propagate_const/swap>) | troca o ponteiro encapsulado
(função membro pública)

##### Observadores

[ get](<#/doc/experimental/propagate_const/get>) | retorna um ponteiro para o objeto apontado pelo ponteiro encapsulado
(função membro pública)
[ operator bool](<#/doc/experimental/propagate_const/operator_bool>) | verifica se o ponteiro encapsulado é nulo
(função membro pública)
[ operator*operator->](<#/doc/experimental/propagate_const/operator_star_>) | desreferencia o ponteiro encapsulado
(função membro pública)
[ operator element_type*operator const element_type*](<#/doc/experimental/propagate_const/operator_element_type_star_>) | função de conversão implícita para ponteiro
(função membro pública)

### Funções não-membro

[ operator==operator!=operator<operator<=operator>operator>=](<#/doc/experimental/propagate_const/operator_cmp>) | compara com outro `propagate_const`, outro ponteiro, ou com nullptr
(modelo de função)
[ std::experimental::swap(std::experimental::propagate_const)](<#/doc/experimental/propagate_const/swap2>) | especializa o algoritmo `swap`
(modelo de função)
[ get_underlying](<#/doc/experimental/propagate_const/get_underlying>) | recupera uma referência para o objeto tipo ponteiro encapsulado
(modelo de função)

### Classes auxiliares

[ std::hash<std::experimental::propagate_const>](<#/doc/experimental/propagate_const/hash>) | suporte a hash para `propagate_const`
(especialização de modelo de classe)
[ std::equal_to<std::experimental::propagate_const>std::not_equal_to<std::experimental::propagate_const>std::less<std::experimental::propagate_const>std::greater<std::experimental::propagate_const>std::less_equal<std::experimental::propagate_const>std::greater_equal<std::experimental::propagate_const>](<#/doc/experimental/propagate_const/cmp_func>) | especializações dos objetos de função de comparação padrão para `propagate_const`
(especialização de modelo de classe)

### Exemplo

Execute este código
```cpp
    #include <experimental/propagate_const>
    #include <iostream>
    #include <memory>
    
    struct X
    {
        void g() const { std::cout << "X::g (const)\n"; }
        void g() { std::cout << "X::g (non-const)\n"; }
    };
    
    struct Y
    {
        Y() : m_propConstX(std::make_unique<X>()), m_autoPtrX(std::make_unique<X>()) {}
    
        void f() const
        {
            std::cout << "Y::f (const)\n";
            m_propConstX->g();
            m_autoPtrX->g();
        }
    
        void f()
        {
            std::cout << "Y::f (non-const)\n";
            m_propConstX->g();
            m_autoPtrX->g();
        }
    
        std::experimental::propagate_const<std::unique_ptr<X>> m_propConstX;
        std::unique_ptr<X> m_autoPtrX;
    };
    
    int main()
    {
        Y y;
        y.f();
    
        const Y cy;
        cy.f();
    }
```

Saída:
```
    Y::f (non-const)
    X::g (non-const)
    X::g (non-const)
    Y::f (const)
    X::g (const)
    X::g (non-const)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3136](<https://cplusplus.github.io/LWG/issue3136>) | LFTSv2 | tipos `T` sem sentido como int* const, void*, ou const PtrLike eram permitidos | não permitido