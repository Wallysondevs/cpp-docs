# Conversão static_cast

Converte entre tipos usando uma combinação de conversões implícitas e definidas pelo usuário.

### Sintaxe

---
`static_cast <`target-type ﻿`>(`expression ﻿`)`
Retorna um valor do tipo target-type.

### Explicação

Apenas as seguintes conversões podem ser realizadas com static_cast, exceto quando tais conversões [removeriam a constness](<#/doc/language/const_cast>) (ou volatilidade).

1) Se expression for um lvalue do tipo “ _cv1_ `Base`” e target-type for “referência para _cv2_ `Derived`”, o resultado se refere ao objeto do tipo `Derived` que engloba expression se todas as seguintes condições forem satisfeitas:

  * `Derived` é um tipo de classe completo.
  * `Base` é uma classe base de `Derived`.
  * _cv1_ não possui uma qualificação cv maior que _cv2_.

Se qualquer das seguintes condições for satisfeita, o programa é malformado:

  * `Base` é uma [classe base virtual](<#/doc/language/derived_class>) de `Derived`.
  * `Base` é uma classe base de uma classe base virtual de `Derived`.
  * Nenhuma [conversão padrão](<#/doc/language/implicit_cast>) válida de “ponteiro para `Derived`” para “ponteiro para `Base`” existe.

Se expression na verdade não for um subobjeto de classe base de um objeto do tipo `Derived`, o comportamento é indefinido.
```cpp
    struct B {};
    struct D : B { B b; };
    
    D d;
    B& br1 = d;
    B& br2 = d.b;
    
    static_cast<D&>(br1); // OK, lvalue denotando o objeto “d” original
    static_cast<D&>(br2); // UB: o subobjeto “b” não é um subobjeto de classe base
```

2) Se target-type for “referência rvalue para `Derived`” e expression for um xvalue do tipo “(possivelmente cv-qualificado) `Base`” tal que `Base` é uma classe base de `Derived`, o resultado e as restrições de tal conversão são os mesmos da conversão de “lvalue `Base` para referência `Derived`”. 3) Se target-type for um tipo de referência rvalue e o tipo referenciado for [compatível com referência](<#/doc/language/reference_initialization>) com o tipo de expression, static_cast converte o valor de um glvalue, prvalue de classe, ou prvalue de array (até C++17)qualquer lvalue (desde C++17) expression para um xvalue referindo-se ao mesmo objeto que a expression, ou para seu subobjeto de classe base (dependendo de target-type).[1](<#/doc/language/static_cast>) Se target-type for uma base inacessível ou ambígua do tipo de expression, o programa é malformado. Se expression for um lvalue de [bit-field](<#/doc/language/bit_field>), ele é primeiro convertido para um prvalue do tipo subjacente. | (desde C++11)

4) Se target-type for o tipo void (possivelmente cv-qualificado), a conversão não tem resultado. Neste caso, expression é uma [expressão de valor descartado](<#/doc/language/expressions>).

5) Caso contrário, expression pode ser explicitamente convertido para target-type se a declaração target-type temp(expression ﻿); for bem-formada para alguma variável temporária inventada temp. O efeito de tal conversão explícita é o mesmo que realizar a declaração e inicialização e então usar temp como resultado da conversão. A expression ﻿ é usada como um lvalue (até C++11)um glvalue (desde C++11) se e somente se a inicialização a usa como um lvalue (até C++11)um glvalue (desde C++11). | (até C++17)
qualquer das seguintes condições é satisfeita:

  * Existe uma sequência de conversão implícita de expression para target-type.
  * A [resolução de sobrecarga](<#/doc/language/overload_resolution>) para uma [inicialização direta](<#/doc/language/direct_initialization>) de um objeto ou referência do tipo target-type a partir de expression encontraria pelo menos uma função viável.

|

  * target-type é um [tipo agregado](<#/doc/language/aggregate_initialization>) que possui um primeiro elemento x e existe uma sequência de conversão implícita de expression para o tipo de x.

| (desde C++20)

A conversão explícita é definida da seguinte forma:

  * Se target-type for um tipo de referência, o efeito é o mesmo que realizar a declaração e inicialização target-type temp(expression ﻿); para alguma variável temporária inventada temp e então usar temp como resultado da conversão.
  * Caso contrário, o objeto resultante é inicializado diretamente a partir de expression ﻿.

(desde C++17)

6) Caso contrário, se a conversão de expression para target-type for o inverso de uma sequência de conversão padrão, e a sequência de conversão não contiver nenhuma das seguintes conversões, a conversão pode ser realizada por static_cast:

  * [conversão de lvalue para rvalue](<#/doc/language/implicit_cast>)
  * [conversão de array para ponteiro](<#/doc/language/implicit_cast>)
  * [conversão de função para ponteiro](<#/doc/language/implicit_cast>)
  * [conversão de ponteiro nulo](<#/doc/language/implicit_cast>)
  * [conversão de ponteiro para membro nulo](<#/doc/language/implicit_cast>)
  * [conversão booleana](<#/doc/language/implicit_cast>)

  * [conversão de ponteiro de função](<#/doc/language/implicit_cast>)

| (desde C++17)

Se um programa usa static_cast para realizar o inverso de uma sequência de conversão padrão malformada, ele é malformado.

7) Caso contrário, as conversões de lvalue para rvalue, de array para ponteiro e de função para ponteiro são aplicadas a expression. Após essas conversões, apenas as seguintes conversões podem ser realizadas por static_cast:

a) Um valor de tipo de [enumeração com escopo](<#/doc/language/enum>) pode ser convertido para um tipo inteiro ou de ponto flutuante. |

  * Se target-type for bool (possivelmente cv-qualificado), o resultado é false se o valor original de expression for zero e true para todos os outros valores.
  * Se target-type for um tipo integral diferente de bool (possivelmente cv-qualificado), o valor permanece inalterado se o valor original de expression puder ser representado por target-type. Caso contrário, o valor resultante é não especificado.

| (até C++20)

  * Se target-type for um tipo integral, o resultado é o mesmo que o de converter para o tipo subjacente da enumeração e então para target-type.

| (desde C++20)

  * Se target-type for um tipo de ponto flutuante, o resultado é o mesmo que o de converter do valor original para target-type.

(desde C++11)

b) Um valor de tipo inteiro ou de enumeração pode ser convertido para qualquer tipo de enumeração completo.

  * Se target-type tiver um tipo subjacente fixo, expression é primeiro convertido para esse tipo por [promoção integral](<#/doc/language/implicit_cast>) ou [conversão integral](<#/doc/language/implicit_cast>), se necessário, e então para target-type.
  * Se target-type não tiver um tipo subjacente fixo, o valor de expression permanece inalterado se o valor original estiver [dentro do intervalo dos valores da enumeração](<#/doc/language/enum>), caso contrário, o comportamento é indefinido.

c) Um valor de um tipo de ponto flutuante também pode ser convertido para qualquer tipo de enumeração completo. O resultado é o mesmo que [converter](<#/doc/language/implicit_cast>) o valor original de expression primeiro para o tipo subjacente de target-type, e então para o próprio target-type.

d) Um prvalue de tipo de ponto flutuante pode ser explicitamente convertido para qualquer outro tipo de ponto flutuante.

  * Se o valor de origem de expression puder ser representado exatamente em target-type, ele não muda.
  * Caso contrário, se o valor de origem de expression estiver entre dois valores representáveis de target-type, o resultado da conversão é uma escolha definida pela implementação de um desses valores.[2](<#/doc/language/static_cast>)
  * Caso contrário, o comportamento é indefinido.

| (desde C++23)

e) Um rvalue (até C++11)Um prvalue (desde C++11) do tipo “ponteiro para _cv1_ `Base`” pode ser explicitamente convertido para o tipo “ponteiro para _cv2_ `Derived`” se todas as seguintes condições forem satisfeitas:

  * `Derived` é um tipo de classe completo.
  * `Base` é uma classe base de `Derived`.
  * _cv1_ não possui uma qualificação cv maior que _cv2_.

Se expression for um [valor de ponteiro nulo](<#/doc/language/pointer>), o resultado é um valor de ponteiro nulo do tipo target-type. Caso contrário, o resultado é um ponteiro para o objeto do tipo `Derived` que engloba o objeto do tipo `Base` apontado por expression.

Se qualquer das seguintes condições for satisfeita, o programa é malformado:

  * `Base` é uma [classe base virtual](<#/doc/language/derived_class>) de `Derived`.
  * `Base` é uma classe base de uma classe base virtual de `Derived`.
  * Nenhuma conversão padrão válida de “ponteiro para `Derived`” para “ponteiro para `Base`” existe.

Se expression não for um valor de ponteiro nulo e não apontar de fato para um subobjeto de classe base de um objeto do tipo `Derived`, o comportamento é indefinido.

f) Um rvalue (até C++11)Um prvalue (desde C++11) do tipo “ponteiro para membro de `Derived` do tipo _cv1_ `T`” pode ser explicitamente convertido para o tipo “ponteiro para membro de `Base` do tipo _cv2_ `T`” se todas as seguintes condições forem satisfeitas:

  * `Derived` é um tipo de classe completo.
  * `Base` é uma classe base de `Derived`.
  * _cv1_ não possui uma qualificação cv maior que _cv2_.

Se expression for um valor de ponteiro para membro nulo, o resultado é um valor de ponteiro para membro nulo do tipo target-type. Caso contrário, o resultado é um ponteiro para o membro original (possivelmente indireto) da classe `Base`.

Se nenhuma conversão padrão válida de “ponteiro para membro de `Base` do tipo `T`” para “ponteiro para membro de `Derived` do tipo `T`” existir, o programa é malformado.

Se expression não for um valor de ponteiro para membro nulo e o membro que ele denota não for um membro (possivelmente indireto) da classe `Base`, o comportamento é indefinido.

g) Um rvalue (até C++11)Um prvalue (desde C++11) do tipo “ponteiro para _cv1_ void” pode ser explicitamente convertido para o tipo “ponteiro para _cv2_ `T`” se `T` for um tipo de objeto e _cv1_ não possuir uma qualificação cv maior que _cv2_.

  * Se expression for um valor de ponteiro nulo, o resultado é um valor de ponteiro nulo do tipo target-type.
  * Se a expression [representa o endereço](<#/doc/language/pointer>) `A` de um [byte](<#/doc/language/memory_model>) na memória e `A` satisfaz o requisito de [alinhamento](<#/doc/language/objects>) de `T`, então o valor do ponteiro resultante também representa `A`.
  * O resultado de qualquer outra conversão de ponteiro desse tipo é não especificado.
  * Se expression for o resultado de uma conversão anterior de um objeto do tipo “ponteiro para _cv3_ `T`”, o resultado tem o valor original.

| (até C++17)

  * Se expression [representa o endereço](<#/doc/language/pointer>) `A` de um [byte](<#/doc/language/memory_model>) na memória, mas `A` não satisfaz o requisito de [alinhamento](<#/doc/language/objects>) de `T`, então o valor do ponteiro resultante é não especificado.
  * Caso contrário, se expression aponta para um objeto a, e existe um objeto b do tipo `T` (ignorando a qualificação cv) que é pointer-interconvertible (veja abaixo) com a, o resultado é um ponteiro para b.
  * Caso contrário, o valor do ponteiro permanece inalterado pela conversão.

| (desde C++17)

Assim como em todas as expressões de cast, o resultado é:

  * um lvalue se target-type for um tipo de referência lvalue ou uma referência rvalue para tipo de função (desde C++11);

  * um xvalue se target-type for um tipo de referência rvalue para objeto;

| (desde C++11)

  * um prvalue caso contrário.

  1. [↑](<#/doc/language/static_cast>) Este tipo de static_cast é usado para implementar move semantics em std::move.
  2. [↑](<#/doc/language/static_cast>) Se a aritmética IEEE for suportada, o arredondamento padrão é para o mais próximo.

### Objetos pointer-interconvertible

Dois objetos a e b são _pointer-interconvertible_ se:

  * eles são o mesmo objeto, ou
  * um é um objeto union e o outro é um membro de dados não estático desse objeto, ou
  * um é um objeto de classe [standard-layout](<#/doc/language/data_members>) e o outro é o primeiro membro de dados não estático desse objeto ou qualquer subobjeto de classe base desse objeto, ou
  * existe um objeto c tal que a e c são pointer-interconvertible, e c e b são pointer-interconvertible.

```cpp
    union U { int a; double b; } u;
    void* x = &u;                        // o valor de x é “ponteiro para u”
    double* y = static_cast<double*>(x); // o valor de y é “ponteiro para u.b”
    char* z = static_cast<char*>(x);     // o valor de z é “ponteiro para u”
```

### Notas

Conversões de base para derivada (_downcasts_) usando static_cast não realizam verificações em tempo de execução para garantir que o [tipo dinâmico](<#/doc/language/type-id>) do objeto apontado/referenciado seja `Derived`, e só podem ser usadas com segurança se esta pré-condição for garantida por outros meios, como ao implementar [polimorfismo estático](<https://en.wikipedia.org/wiki/Curiously_recurring_template_pattern#Static_polymorphism> "enwiki:Curiously recurring template pattern"). Um downcast seguro pode ser feito com [`dynamic_cast`](<#/doc/language/dynamic_cast>).

static_cast também pode ser usado para desambiguar sobrecargas de função realizando uma conversão de função para ponteiro para um tipo específico, como em
```cpp
    std::for_each(files.begin(), files.end(),
                  static_cast<std::ostream&(*)(std::ostream&)>(std::flush));
```

### Palavras-chave

[`static_cast`](<#/doc/keyword/static_cast>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <vector>
    
    struct B
    {
        int m = 42;
        const char* hello() const
        {
            return "Hello world, this is B!\n";
        }
    };
    
    struct D : B
    {
        const char* hello() const
        {
            return "Hello world, this is D!\n";
        }
    };
    
    enum class E { ONE = 1, TWO, THREE };
    enum EU { ONE = 1, TWO, THREE };
    
    int main()
    {
        // 1. downcast estático
        D d;
        B& br = d; // upcast via conversão implícita
        std::cout << "1) " << br.hello();
        D& another_d = static_cast<D&>(br); // downcast
        std::cout << "1) " << another_d.hello();
    
        // 3. lvalue para xvalue
        std::vector<int> v0{1, 2, 3};
        std::vector<int> v2 = static_cast<std::vector<int>&&>(v0);
        std::cout << "3) após a movimentação, v0.size() = " << v0.size() << '\n';
    
        // 4. expressão de valor descartado
        static_cast<void>(v2.size());
    
        // 5. conversão de inicialização
        int n = static_cast<int>(3.14);
        std::cout << "5) n = " << n << '\n';
        std::vector<int> v = static_cast<std::vector<int>>(10);
        std::cout << "5) v.size() = " << v.size() << '\n';
    
        // 6. inverso da conversão implícita
        void* nv = &n;
        int* ni = static_cast<int*>(nv);
        std::cout << "6) *ni = " << *ni << '\n';
    
        // 7a. enum com escopo para int
        E e = E::TWO;
        int two = static_cast<int>(e);
        std::cout << "7a) " << two << '\n';
    
        // 7b. int para enum, enum para outra enum
        E e2 = static_cast<E>(two);
        [[maybe_unused]]
        EU eu = static_cast<EU>(e2);
    
        // 7f. upcast de ponteiro para membro
        int D::*pm = &D::m;
        std::cout << "7f) " << br.*static_cast<int B::*>(pm) << '\n';
    
        // 7g. void* para qualquer ponteiro de objeto
        void* voidp = &e;
        [[maybe_unused]]
        std::vector<int>* p = static_cast<std::vector<int>*>(voidp);
    }
```

Saída:
```
    1) Hello world, this is B!
    1) Hello world, this is D!
    3) after move, v0.size() = 0
    5) n = 3
    5) v.size() = 10
    6) *ni = 3
    7a) 2
    7f) 42
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 137](<https://cplusplus.github.io/CWG/issues/137.html>) | C++98 | a constness e volatilidade de ponteiros para void podiam ser removidas por cast | qualificações cv não podem ser removidas por cast em tais casos
[CWG 427](<https://cplusplus.github.io/CWG/issues/427.html>) | C++98 | downcast poderia ser ambíguo com inicialização direta | seleciona downcast neste caso
[CWG 439](<https://cplusplus.github.io/CWG/issues/439.html>) | C++98 | ao converter um “ponteiro para objeto” para “ponteiro para void” e depois de volta para si mesmo, ele só poderia preservar seu valor se o tipo resultante tivesse a mesma qualificação cv | a qualificação cv pode ser diferente
[CWG 1094](<https://cplusplus.github.io/CWG/issues/1094.html>) | C++98 | a conversão de valores de ponto flutuante para valores de enumeração era não especificada | especificada
[CWG 1320](<https://cplusplus.github.io/CWG/issues/1320.html>) | C++11 | a conversão de valores de enumeração com escopo para bool era não especificada | especificada
[CWG 1412](<https://cplusplus.github.io/CWG/issues/1412.html>) | C++98 | o resultado da conversão de “ponteiro para void” para “ponteiro para objeto” era incerto | esclarecido
[CWG 1447](<https://cplusplus.github.io/CWG/issues/1447.html>) | C++11 | a conversão de bit-fields para referências rvalue era não especificada (não é possível vincular referências a bit-fields) | especificada
[CWG 1766](<https://cplusplus.github.io/CWG/issues/1766.html>) | C++98 | a conversão de valores integrais ou de enumeração para valores de enumeração resultava em comportamento não especificado se expression estivesse fora do intervalo | o comportamento é indefinido neste caso
[CWG 1832](<https://cplusplus.github.io/CWG/issues/1832.html>) | C++98 | a conversão de valores integrais ou de enumeração para valores de enumeração permitia que target-type fosse incompleto | não permitido
[CWG 2224](<https://cplusplus.github.io/CWG/issues/2224.html>) | C++98 | a conversão de um membro do tipo de classe base para seu objeto completo do tipo de classe derivada era válida | o comportamento é indefinido neste caso
[CWG 2254](<https://cplusplus.github.io/CWG/issues/2254.html>) | C++11 | um objeto de classe standard-layout sem membros de dados era pointer-interconvertible para sua primeira classe base | é pointer-interconvertible para qualquer uma de suas classes base
[CWG 2284](<https://cplusplus.github.io/CWG/issues/2284.html>) | C++11 | um objeto union não standard-layout e um membro de dados não estático desse objeto não eram pointer-interconvertible | eles são
[CWG 2310](<https://cplusplus.github.io/CWG/issues/2310.html>) | C++98 | para conversões de ponteiro de base para derivada e conversões de ponteiro para membro de derivada para base, o tipo de classe derivada poderia ser incompleto | deve ser completo
[CWG 2338](<https://cplusplus.github.io/CWG/issues/2338.html>) | C++11 | a conversão para tipos de enumeração com tipo subjacente fixo resultava em comportamento indefinido se expression estivesse fora do intervalo | converter para o tipo subjacente primeiro (sem comportamento indefinido)
[CWG 2499](<https://cplusplus.github.io/CWG/issues/2499.html>) | C++11 | uma classe standard-layout poderia ter uma classe base não pointer-interconvertible, mesmo que todos os subobjetos base tivessem o mesmo endereço | não tem
[CWG 2718](<https://cplusplus.github.io/CWG/issues/2718.html>) | C++98 | para conversões de referência de base para derivada, o tipo de classe derivada poderia ser incompleto | deve ser completo
[CWG 2882](<https://cplusplus.github.io/CWG/issues/2882.html>) | C++98 | não estava claro se static_cast&lt;void&gt;(expr) tenta formar uma sequência de conversão implícita de expr para void | nenhuma tentativa neste caso

### Referências

  * C++23 standard (ISO/IEC 14882:2024):

    

  * 7.6.1.9 Static cast [expr.static.cast] 

  * C++20 standard (ISO/IEC 14882:2020):

    

  * 7.6.1.8 Static cast [expr.static.cast] 

  * C++17 standard (ISO/IEC 14882:2017):

    

  * 8.2.9 Static cast [expr.static.cast] 

  * C++14 standard (ISO/IEC 14882:2014):

    

  * 5.2.9 Static cast [expr.static.cast] 

  * C++11 standard (ISO/IEC 14882:2011):

    

  * 5.2.9 Static cast [expr.static.cast] 

  * C++98 standard (ISO/IEC 14882:1998):

    

  * 5.2.9 Static cast [expr.static.cast] 

  * C++03 standard (ISO/IEC 14882:2003):

    

  * 5.2.9 Static cast [expr.static.cast] 

### Veja também

  * [`const_cast`](<#/doc/language/const_cast>)
  * [`dynamic_cast`](<#/doc/language/dynamic_cast>)
  * [`reinterpret_cast`](<#/doc/language/reinterpret_cast>)
  * [explicit cast](<#/doc/language/explicit_cast>)
  * [implicit conversions](<#/doc/language/implicit_cast>)
