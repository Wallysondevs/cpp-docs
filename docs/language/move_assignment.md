# Operador de atribuição por movimento

Um operador de atribuição por movimento é uma [função membro não estática](<#/doc/language/member_functions>) não-template com o nome operator= que pode ser chamada com um argumento do mesmo tipo de classe e copia o conteúdo do argumento, possivelmente mutando o argumento.

### Sintaxe

Para a sintaxe formal do operador de atribuição por movimento, veja [declaração de função](<#/doc/language/function>). A lista de sintaxe abaixo demonstra apenas um subconjunto de todas as sintaxes válidas de operador de atribuição por movimento.

---
```cpp
return-type `operator=(` parameter-list ﻿`);`  // (1)
return-type `operator=(` parameter-list ﻿`)` function-body  // (2)
return-type `operator=(` parameter-list-no-default ﻿`) = default;`  // (3)
return-type `operator=(` parameter-list ﻿`) = delete;`  // (4)
return-type class-name ﻿`::`operator=(` parameter-list ﻿`)` function-body  // (5)
return-type class-name ﻿`::`operator=(` parameter-list-no-default ﻿`) = default;`  // (6)
```
- **class-name** — a classe cujo operador de atribuição por movimento está sendo declarado; o tipo da classe é dado como `T` nas descrições abaixo
- **parameter-list** — uma [lista de parâmetros](<#/doc/language/function>) de apenas um parâmetro, que é do tipo `T&&`, const T&&, volatile T&& ou const volatile T&&
- **parameter-list-no-default** — uma [lista de parâmetros](<#/doc/language/function>) de apenas um parâmetro, que é do tipo `T&&`, const T&&, volatile T&& ou const volatile T&& e não possui um argumento padrão
- **function-body** — o [corpo da função](<#/doc/language/initializer_list>) do operador de atribuição por movimento
- **return-type** — qualquer tipo, mas `T&` é preferido para ser consistente com tipos escalares

### Explicação

1) Declaração de um operador de atribuição por movimento dentro da definição da classe.

2-4) Definição de um operador de atribuição por movimento dentro da definição da classe.

3) O operador de atribuição por movimento é explicitamente padronizado (`explicitly-defaulted`).

4) O operador de atribuição por movimento é deletado.

5,6) Definição de um operador de atribuição por movimento fora da definição da classe (a classe deve conter uma declaração (1)).

6) O operador de atribuição por movimento é explicitamente padronizado (`explicitly-defaulted`).
```cpp
    struct X
    {
        X& operator=(X&& other);    // move assignment operator
    //  X operator=(const X other); // Error: incorrect parameter type
    };
    
    union Y
    {
        // move assignment operators can have syntaxes not listed above,
        // as long as they follow the general function declaration syntax
        // and do not viloate the restrictions listed above
        auto operator=(Y&& other) -> Y&;       // OK: trailing return type
        Y& operator=(this Y&& self, Y& other); // OK: explicit object parameter
    //  Y& operator=(Y&&, int num = 1);        // Error: has other non-object parameters
    };
```

O operador de atribuição por movimento é chamado sempre que é selecionado pela [resolução de sobrecarga](<#/doc/language/overload_resolution>), por exemplo, quando um objeto aparece no lado esquerdo de uma expressão de atribuição, onde o lado direito é um rvalue do mesmo tipo ou de um tipo implicitamente conversível.

Operadores de atribuição por movimento tipicamente transferem os recursos mantidos pelo argumento (por exemplo, ponteiros para objetos alocados dinamicamente, descritores de arquivo, sockets TCP, handles de thread, etc.), em vez de fazer cópias deles, e deixam o argumento em um estado válido, mas de outra forma indeterminado. Como a atribuição por movimento não altera o tempo de vida do argumento, o destrutor será tipicamente chamado no argumento em um ponto posterior. Por exemplo, a atribuição por movimento de uma [std::string](<#/doc/string/basic_string>) ou de um [std::vector](<#/doc/container/vector>) pode resultar no argumento sendo deixado vazio. Uma atribuição por movimento é menos, e não mais, restritivamente definida do que uma atribuição comum; onde a atribuição comum deve deixar duas cópias de dados ao final, a atribuição por movimento é exigida para deixar apenas uma.

### Operador de atribuição por movimento implicitamente declarado

Se nenhum operador de atribuição por movimento definido pelo usuário for fornecido para um tipo de classe, e tudo o que se segue for verdadeiro:

*   não há [construtores de cópia](<#/doc/language/copy_constructor>) declarados pelo usuário;
*   não há [construtores de movimento](<#/doc/language/move_constructor>) declarados pelo usuário;
*   não há [operadores de atribuição de cópia](<#/doc/language/as_operator>) declarados pelo usuário;
*   não há [destrutor](<#/doc/language/destructor>) declarado pelo usuário,

então o compilador declarará um operador de atribuição por movimento como um membro público inline de sua classe com a assinatura T& T::operator=(T&&).

Uma classe pode ter múltiplos operadores de atribuição por movimento, por exemplo, tanto T& T::operator=(const T&&) quanto T& T::operator=(T&&). Se alguns operadores de atribuição por movimento definidos pelo usuário estiverem presentes, o usuário ainda pode forçar a geração do operador de atribuição por movimento implicitamente declarado com a palavra-chave `default`.

O operador de atribuição por movimento implicitamente declarado possui uma especificação de exceção conforme descrito em [especificação de exceção dinâmica](<#/doc/language/except_spec>)(até C++17)[especificação noexcept](<#/doc/language/noexcept_spec>)(desde C++17).

Como algum operador de atribuição (por movimento ou cópia) é sempre declarado para qualquer classe, o operador de atribuição da classe base é sempre ocultado. Se uma using-declaration for usada para trazer o operador de atribuição da classe base, e seu tipo de argumento puder ser o mesmo que o tipo de argumento do operador de atribuição implícito da classe derivada, a using-declaration também será ocultada pela declaração implícita.

### Operador de atribuição por movimento implicitamente definido

Se o operador de atribuição por movimento implicitamente declarado não for deletado nem trivial, ele é definido (ou seja, um corpo de função é gerado e compilado) pelo compilador se [odr-used](<#/doc/language/definition>) ou [necessário para avaliação constante](<#/doc/language/constant_expression>)(desde C++14).

Para tipos union, o operador de atribuição por movimento implicitamente definido copia a representação do objeto (como por [std::memmove](<#/doc/string/byte/memmove>)).

Para tipos de classe não-union, o operador de atribuição por movimento realiza uma atribuição por movimento completa membro a membro das bases diretas do objeto e dos membros não estáticos imediatos, na sua ordem de declaração, usando atribuição embutida para os escalares, atribuição por movimento membro a membro para arrays, e operador de atribuição por movimento para tipos de classe (chamado não-virtualmente).

O operador de atribuição por movimento implicitamente definido para uma classe `T` é [`constexpr`](<#/doc/language/constexpr>) se

*   `T` é um [tipo literal](<#/doc/named_req/LiteralType>), e
*   o operador de atribuição selecionado para mover cada subobjeto de classe base direta é uma função constexpr, e
*   para cada membro de dados não estático de `T` que é do tipo de classe (ou array disso), o operador de atribuição selecionado para mover esse membro é uma função constexpr.

```cpp
  // (desde C++14)
(até C++23)
O operador de atribuição por movimento implicitamente definido para uma classe `T` é `constexpr`.  // (desde C++23)
```

Assim como na atribuição de cópia, é não especificado se subobjetos de classe base virtual que são acessíveis por mais de um caminho na hierarquia de herança são atribuídos mais de uma vez pelo operador de atribuição por movimento implicitamente definido:
```cpp
    struct V
    {
        V& operator=(V&& other)
        {
            // this may be called once or twice
            // if called twice, 'other' is the just-moved-from V subobject
            return *this;
        }
    };
    
    struct A : virtual V {}; // operator= calls V::operator=
    struct B : virtual V {}; // operator= calls V::operator=
    struct C : B, A {};      // operator= calls B::operator=, then A::operator=
                             // but they may only call V::operator= once
    
    int main()
    {
        C c1, c2;
        c2 = std::move(c1);
    }
```

### Operador de atribuição por movimento deletado

O operador de atribuição por movimento implicitamente declarado ou padronizado para a classe `T` é definido como deletado se qualquer uma das seguintes condições for satisfeita:

*   `T` possui um membro de dados não estático de um tipo não-classe qualificado como const (ou possivelmente um array multidimensional disso).
*   `T` possui um membro de dados não estático de um tipo de referência.
*   `T` possui um [subobjeto potencialmente construído](<#/doc/language/objects>) do tipo de classe `M` (ou possivelmente um array multidimensional disso) de tal forma que a resolução de sobrecarga aplicada para encontrar o operador de atribuição por movimento de `M`

    *   não resulta em um candidato utilizável, ou
    *   no caso do subobjeto ser um [membro variante](<#/doc/language/union>), seleciona uma função não-trivial.

Um operador de atribuição por movimento implicitamente declarado e deletado é ignorado pela [resolução de sobrecarga](<#/doc/language/overload_resolution>).

### Operador de atribuição por movimento trivial

O operador de atribuição por movimento para a classe `T` é trivial se tudo o que se segue for verdadeiro:

*   Não é fornecido pelo usuário (significando que é implicitamente definido ou padronizado);
*   `T` não possui funções membro virtuais;
*   `T` não possui classes base virtuais;
*   o operador de atribuição por movimento selecionado para cada base direta de `T` é trivial;
*   o operador de atribuição por movimento selecionado para cada membro de tipo de classe não estático (ou array de tipo de classe) de `T` é trivial.

Um operador de atribuição por movimento trivial executa a mesma ação que o operador de atribuição de cópia trivial, ou seja, faz uma cópia da representação do objeto como se fosse por [std::memmove](<#/doc/string/byte/memmove>). Todos os tipos de dados compatíveis com a linguagem C são trivialmente atribuíveis por movimento.

### Operador de atribuição por movimento elegível

Um operador de atribuição por movimento é elegível se não for deletado. | (até C++20)
Um operador de atribuição por movimento é elegível se todas as seguintes condições forem satisfeitas:

*   Não é deletado.
*   Suas [restrições associadas](<#/doc/language/constraints>) (se houver) são satisfeitas.
*   Nenhum operador de atribuição por movimento cujas restrições associadas são satisfeitas é [mais restrito](<#/doc/language/constraints>).

| (desde C++20)

A trivialidade de operadores de atribuição por movimento elegíveis determina se a classe é um [tipo trivialmente copiável](<#/doc/named_req/TriviallyCopyable>).

### Notas

Se ambos os operadores de atribuição de cópia e por movimento forem fornecidos, a resolução de sobrecarga seleciona a atribuição por movimento se o argumento for um [_rvalue_](<#/doc/language/value_category>) (seja um [_prvalue_](<#/doc/language/value_category>) como um temporário sem nome ou um [_xvalue_](<#/doc/language/value_category>) como o resultado de std::move), e seleciona a atribuição de cópia se o argumento for um [_lvalue_](<#/doc/language/value_category>) (objeto nomeado ou uma função/operador que retorna uma referência lvalue). Se apenas a atribuição de cópia for fornecida, todas as categorias de argumento a selecionam (desde que ela receba seu argumento por valor ou como referência a const, já que rvalues podem se ligar a referências const), o que torna a atribuição de cópia o fallback para a atribuição por movimento, quando o movimento não está disponível.

É não especificado se subobjetos de classe base virtual que são acessíveis por mais de um caminho na hierarquia de herança são atribuídos mais de uma vez pelo operador de atribuição por movimento implicitamente definido (o mesmo se aplica à [atribuição de cópia](<#/doc/language/as_operator>)).

Veja [sobrecarga do operador de atribuição](<#/doc/language/operators>) para detalhes adicionais sobre o comportamento esperado de um operador de atribuição por movimento definido pelo usuário.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <utility>
    
    struct A
    {
        std::string s;
    
        A() : s("test") {}
    
        A(const A& o) : s(o.s) { std::cout << "move failed!\n"; }
    
        A(A&& o) : s(std::move(o.s)) {}
    
        A& operator=(const A& other)
        {
             s = other.s;
             std::cout << "copy assigned\n";
             return *this;
        }
    
        A& operator=(A&& other)
        {
             s = std::move(other.s);
             std::cout << "move assigned\n";
             return *this;
        }
    };
    
    A f(A a) { return a; }
    
    struct B : A
    {
        std::string s2; 
        int n;
        // implicit move assignment operator B& B::operator=(B&&)
        // calls A's move assignment operator
        // calls s2's move assignment operator
        // and makes a bitwise copy of n
    };
    
    struct C : B
    {
        ~C() {} // destructor prevents implicit move assignment
    };
    
    struct D : B
    {
        D() {}
        ~D() {} // destructor would prevent implicit move assignment
        D& operator=(D&&) = default; // force a move assignment anyway 
    };
    
    int main()
    {
        A a1, a2;
        std::cout << "Trying to move-assign A from rvalue temporary\n";
        a1 = f(A()); // move-assignment from rvalue temporary
        std::cout << "Trying to move-assign A from xvalue\n";
        a2 = std::move(a1); // move-assignment from xvalue
    
        std::cout << "\nTrying to move-assign B\n";
        B b1, b2;
        std::cout << "Before move, b1.s = \"" << b1.s << "\"\n";
        b2 = std::move(b1); // calls implicit move assignment
        std::cout << "After move, b1.s = \"" << b1.s << "\"\n";
    
        std::cout << "\nTrying to move-assign C\n";
        C c1, c2;
        c2 = std::move(c1); // calls the copy assignment operator
    
        std::cout << "\nTrying to move-assign D\n";
        D d1, d2;
        d2 = std::move(d1);
    }
```

Saída:
```
    Trying to move-assign A from rvalue temporary
    move assigned
    Trying to move-assign A from xvalue
    move assigned
    
    Trying to move-assign B
    Before move, b1.s = "test"
    move assigned
    After move, b1.s = ""
    
    Trying to move-assign C
    copy assigned
    
    Trying to move-assign D
    move assigned
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1353](<https://cplusplus.github.io/CWG/issues/1353.html>) | C++11 | as condições onde operadores de atribuição por movimento padronizados são definidos como deletados não consideravam tipos de array multidimensionais | considerar esses tipos
[CWG 1402](<https://cplusplus.github.io/CWG/issues/1402.html>) | C++11 | um operador de atribuição por movimento padronizado que chamaria um operador de atribuição de cópia não-trivial foi deletado; um operador de atribuição por movimento padronizado que é deletado ainda participava da resolução de sobrecarga | permite a chamada para tal operador de atribuição de cópia; feito para ser ignorado na resolução de sobrecarga
[CWG 1806](<https://cplusplus.github.io/CWG/issues/1806.html>) | C++11 | a especificação para um operador de atribuição por movimento padronizado envolvendo uma classe base virtual estava faltando | adicionada
[CWG 2094](<https://cplusplus.github.io/CWG/issues/2094.html>) | C++11 | um subobjeto volátil tornava um operador de atribuição por movimento padronizado não-trivial ([CWG issue 496](<https://cplusplus.github.io/CWG/issues/496.html>)) | trivialidade não afetada
[CWG 2180](<https://cplusplus.github.io/CWG/issues/2180.html>) | C++11 | um operador de atribuição por movimento padronizado para a classe `T` não era definido como deletado se `T` fosse abstrata e tivesse classes base virtuais diretas não atribuíveis por movimento | o operador é definido como deletado neste caso
[CWG 2595](<https://cplusplus.github.io/CWG/issues/2595.html>) | C++20 | um operador de atribuição por movimento não era elegível se houvesse outro operador de atribuição por movimento que fosse mais restrito, mas não satisfizesse suas restrições associadas | ele pode ser elegível neste caso
[CWG 2690](<https://cplusplus.github.io/CWG/issues/2690.html>) | C++11 | o operador de atribuição por movimento implicitamente definido para tipos union não copiava a representação do objeto | eles copiam a representação do objeto

### Veja também

*   [construtor](<#/doc/language/initializer_list>)
*   [construtor de conversão](<#/doc/language/converting_constructor>)
*   [atribuição de cópia](<#/doc/language/as_operator>)
*   [construtor de cópia](<#/doc/language/copy_constructor>)
*   [construtor padrão](<#/doc/language/default_constructor>)
*   [destrutor](<#/doc/language/destructor>)
*   [inicialização](<#/doc/language/initialization>)
    *   [inicialização de agregado](<#/doc/language/aggregate_initialization>)
    *   [inicialização constante](<#/doc/language/constant_initialization>)
    *   [inicialização por cópia](<#/doc/language/copy_initialization>)
    *   [inicialização padrão](<#/doc/language/default_initialization>)
    *   [inicialização direta](<#/doc/language/direct_initialization>)
    *   [inicialização por lista](<#/doc/language/list_initialization>)
    *   [inicialização de referência](<#/doc/language/reference_initialization>)
    *   [inicialização por valor](<#/doc/language/value_initialization>)
    *   [inicialização zero](<#/doc/language/zero_initialization>)
*   [construtor de movimento](<#/doc/language/move_constructor>)
