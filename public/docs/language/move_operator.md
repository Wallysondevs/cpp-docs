# Operador de atribuição de movimento

Um operador de atribuição de movimento é uma [função membro não-estática](<#/doc/language/member_functions>) não-template com o nome operator= que pode ser chamada com um argumento do mesmo tipo de classe e copia o conteúdo do argumento, possivelmente mutando o argumento.

### Sintaxe

Para a sintaxe formal do operador de atribuição de movimento, veja [declaração de função](<#/doc/language/function>). A lista de sintaxe abaixo demonstra apenas um subconjunto de todas as sintaxes válidas de operador de atribuição de movimento.

---
```cpp
return-type `operator=(` parameter-list ﻿`);`  // (1)
return-type `operator=(` parameter-list ﻿`)` function-body  // (2)
return-type `operator=(` parameter-list-no-default ﻿`) = default;`  // (3)
return-type `operator=(` parameter-list ﻿`) = delete;`  // (4)
return-type class-name ﻿`::`operator=(` parameter-list ﻿`)` function-body  // (5)
return-type class-name ﻿`::`operator=(` parameter-list-no-default ﻿`) = default;`  // (6)
```
- **class-name** — a classe cujo operador de atribuição de movimento está sendo declarado, o tipo de classe é dado como `T` nas descrições abaixo
- **parameter-list** — uma [lista de parâmetros](<#/doc/language/function>) de apenas um parâmetro, que é do tipo `T&&`, const T&&, volatile T&& ou const volatile T&&
- **parameter-list-no-default** — uma [lista de parâmetros](<#/doc/language/function>) de apenas um parâmetro, que é do tipo `T&&`, const T&&, volatile T&& ou const volatile T&& e não possui um argumento padrão
- **function-body** — o [corpo da função](<#/doc/language/initializer_list>) do operador de atribuição de movimento
- **return-type** — qualquer tipo, mas `T&` é preferido para ser consistente com os tipos scala

### Explicação

1) Declaração de um operador de atribuição de movimento dentro da definição da classe.

2-4) Definição de um operador de atribuição de movimento dentro da definição da classe.

3) O operador de atribuição de movimento é explicitamente padronizado.

4) O operador de atribuição de movimento é deletado.

5,6) Definição de um operador de atribuição de movimento fora da definição da classe (a classe deve conter uma declaração (1)).

6) O operador de atribuição de movimento é explicitamente padronizado.
```cpp
    struct X
    {
        X& operator=(X&& other);    // operador de atribuição de movimento
    //  X operator=(const X other); // Erro: tipo de parâmetro incorreto
    };
    
    union Y
    {
        // operadores de atribuição de movimento podem ter sintaxes não listadas acima,
        // desde que sigam a sintaxe geral de declaração de função
        // e não violem as restrições listadas acima
        auto operator=(Y&& other) -> Y&;       // OK: tipo de retorno trailing
        Y& operator=(this Y&& self, Y& other); // OK: parâmetro de objeto explícito
    //  Y& operator=(Y&&, int num = 1);        // Erro: possui outros parâmetros não-objeto
    };
```

O operador de atribuição de movimento é chamado sempre que é selecionado pela [resolução de sobrecarga](<#/doc/language/overload_resolution>), por exemplo, quando um objeto aparece no lado esquerdo de uma expressão de atribuição, onde o lado direito é um rvalue do mesmo tipo ou de um tipo implicitamente conversível.

Operadores de atribuição de movimento tipicamente transferem os recursos mantidos pelo argumento (por exemplo, ponteiros para objetos alocados dinamicamente, descritores de arquivo, sockets TCP, handles de thread, etc.), em vez de fazer cópias deles, e deixam o argumento em um estado válido, mas de outra forma indeterminado. Como a atribuição de movimento não altera o tempo de vida do argumento, o destrutor será tipicamente chamado no argumento em um ponto posterior. Por exemplo, atribuir por movimento a partir de uma [std::string](<#/doc/string/basic_string>) ou de um [std::vector](<#/doc/container/vector>) pode resultar no argumento sendo deixado vazio. Uma atribuição de movimento é definida de forma menos, não mais restritiva do que uma atribuição comum; onde a atribuição comum deve deixar duas cópias de dados ao final, a atribuição de movimento é exigida para deixar apenas uma.

### Operador de atribuição de movimento implicitamente declarado

Se nenhum operador de atribuição de movimento definido pelo usuário for fornecido para um tipo de classe, e tudo o que se segue for verdadeiro:

  * não há [construtores de cópia](<#/doc/language/copy_constructor>) declarados pelo usuário;
  * não há [construtores de movimento](<#/doc/language/move_constructor>) declarados pelo usuário;
  * não há [operadores de atribuição de cópia](<#/doc/language/as_operator>) declarados pelo usuário;
  * não há [destrutor](<#/doc/language/destructor>) declarado pelo usuário,

então o compilador declarará um operador de atribuição de movimento como um membro público inline de sua classe com a assinatura T& T::operator=(T&&).

Uma classe pode ter múltiplos operadores de atribuição de movimento, por exemplo, ambos T& T::operator=(const T&&) e T& T::operator=(T&&). Se alguns operadores de atribuição de movimento definidos pelo usuário estiverem presentes, o usuário ainda pode forçar a geração do operador de atribuição de movimento implicitamente declarado com a palavra-chave `default`.

O operador de atribuição de movimento implicitamente declarado possui uma especificação de exceção conforme descrito em [especificação de exceção dinâmica](<#/doc/language/except_spec>)(até C++17)[especificação noexcept](<#/doc/language/noexcept_spec>)(desde C++17).

Como algum operador de atribuição (de movimento ou de cópia) é sempre declarado para qualquer classe, o operador de atribuição da classe base é sempre ocultado. Se uma using-declaration for usada para trazer o operador de atribuição da classe base, e seu tipo de argumento puder ser o mesmo que o tipo de argumento do operador de atribuição implícito da classe derivada, a using-declaration também é ocultada pela declaração implícita.

### Operador de atribuição de movimento implicitamente definido

Se o operador de atribuição de movimento implicitamente declarado não for deletado nem trivial, ele é definido (isto é, um corpo de função é gerado e compilado) pelo compilador se [odr-usado](<#/doc/language/definition>) ou [necessário para avaliação constante](<#/doc/language/constant_expression>)(desde C++14).

Para tipos union, o operador de atribuição de movimento implicitamente definido copia a representação do objeto (como por [std::memmove](<#/doc/string/byte/memmove>)).

Para tipos de classe não-union, o operador de atribuição de movimento realiza uma atribuição de movimento completa membro a membro das bases diretas do objeto e dos membros não-estáticos imediatos, na sua ordem de declaração, usando atribuição embutida para os escalares, atribuição de movimento membro a membro para arrays, e operador de atribuição de movimento para tipos de classe (chamado não-virtualmente).

O operador de atribuição de movimento implicitamente definido para uma classe `T` é [`constexpr`](<#/doc/language/constexpr>) se

  * `T` é um [tipo literal](<#/doc/named_req/LiteralType>), e
  * o operador de atribuição selecionado para mover cada subobjeto de classe base direta é uma função constexpr, e
  * para cada membro de dados não-estático de `T` que é do tipo de classe (ou array disso), o operador de atribuição selecionado para mover esse membro é uma função constexpr.

```cpp
  // (desde C++14)
(até C++23)
O operador de atribuição de movimento implicitamente definido para uma classe `T` é `constexpr`.  // (desde C++23)
```

Assim como na atribuição de cópia, é não especificado se subobjetos de classe base virtual que são acessíveis através de mais de um caminho na hierarquia de herança, são atribuídos mais de uma vez pelo operador de atribuição de movimento implicitamente definido:
```cpp
    struct V
    {
        V& operator=(V&& other)
        {
            // isso pode ser chamado uma ou duas vezes
            // se chamado duas vezes, 'other' é o subobjeto V recém-movido
            return *this;
        }
    };
    
    struct A : virtual V {}; // operator= chama V::operator=
    struct B : virtual V {}; // operator= chama V::operator=
    struct C : B, A {};      // operator= chama B::operator=, depois A::operator=
                             // mas eles podem chamar V::operator= apenas uma vez
    
    int main()
    {
        C c1, c2;
        c2 = std::move(c1);
    }
```

### Operador de atribuição de movimento deletado

O operador de atribuição de movimento implicitamente declarado ou padronizado para a classe `T` é definido como deletado se qualquer uma das seguintes condições for satisfeita:

  * `T` possui um membro de dados não-estático de um tipo não-classe qualificado como const (ou possivelmente um array multidimensional disso).
  * `T` possui um membro de dados não-estático de um tipo de referência.
  * `T` possui um [subobjeto potencialmente construído](<#/doc/language/objects>) do tipo de classe `M` (ou possivelmente um array multidimensional disso) de tal forma que a resolução de sobrecarga, conforme aplicada para encontrar o operador de atribuição de movimento de `M`
    * não resulta em um candidato utilizável, ou
    * no caso do subobjeto ser um [membro variante](<#/doc/language/union>), seleciona uma função não-trivial.

Um operador de atribuição de movimento implicitamente declarado e deletado é ignorado pela [resolução de sobrecarga](<#/doc/language/overload_resolution>).

### Operador de atribuição de movimento trivial

O operador de atribuição de movimento para a classe `T` é trivial se tudo o que se segue for verdadeiro:

  * Não é fornecido pelo usuário (significando que é implicitamente definido ou padronizado);
  * `T` não possui funções membro virtuais;
  * `T` não possui classes base virtuais;
  * o operador de atribuição de movimento selecionado para cada base direta de `T` é trivial;
  * o operador de atribuição de movimento selecionado para cada membro de tipo de classe não-estático (ou array de tipo de classe) de `T` é trivial.

Um operador de atribuição de movimento trivial executa a mesma ação que o operador de atribuição de cópia trivial, isto é, faz uma cópia da representação do objeto como se fosse por [std::memmove](<#/doc/string/byte/memmove>). Todos os tipos de dados compatíveis com a linguagem C são trivialmente atribuíveis por movimento.

### Operador de atribuição de movimento elegível

Um operador de atribuição de movimento é elegível se não for deletado. | (até C++20)
Um operador de atribuição de movimento é elegível se todas as seguintes condições forem satisfeitas:

  * Não é deletado.
  * Suas [restrições associadas](<#/doc/language/constraints>) (se houver) são satisfeitas.
  * Nenhum operador de atribuição de movimento cujas restrições associadas são satisfeitas é [mais restrito](<#/doc/language/constraints>).

| (desde C++20)

A trivialidade dos operadores de atribuição de movimento elegíveis determina se a classe é um [tipo trivialmente copiável](<#/doc/named_req/TriviallyCopyable>).

### Notas

Se ambos os operadores de atribuição de cópia e de movimento forem fornecidos, a resolução de sobrecarga seleciona a atribuição de movimento se o argumento for um [_rvalue_](<#/doc/language/value_category>) (seja um [_prvalue_](<#/doc/language/value_category>) como um temporário sem nome ou um [_xvalue_](<#/doc/language/value_category>) como o resultado de std::move), e seleciona a atribuição de cópia se o argumento for um [_lvalue_](<#/doc/language/value_category>) (objeto nomeado ou uma função/operador que retorna uma referência lvalue). Se apenas a atribuição de cópia for fornecida, todas as categorias de argumento a selecionam (desde que ela receba seu argumento por valor ou como referência a const, já que rvalues podem se ligar a referências const), o que torna a atribuição de cópia o fallback para a atribuição de movimento, quando o movimento não está disponível.

É não especificado se subobjetos de classe base virtual que são acessíveis através de mais de um caminho na hierarquia de herança, são atribuídos mais de uma vez pelo operador de atribuição de movimento implicitamente definido (o mesmo se aplica à [atribuição de cópia](<#/doc/language/as_operator>)).

Veja [sobrecarga do operador de atribuição](<#/doc/language/operators>) para detalhes adicionais sobre o comportamento esperado de um operador de atribuição de movimento definido pelo usuário.

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
        // operador de atribuição de movimento implícito B& B::operator=(B&&)
        // chama o operador de atribuição de movimento de A
        // chama o operador de atribuição de movimento de s2
        // e faz uma cópia bit a bit de n
    };
    
    struct C : B
    {
        ~C() {} // destrutor impede atribuição de movimento implícita
    };
    
    struct D : B
    {
        D() {}
        ~D() {} // destrutor impediria atribuição de movimento implícita
        D& operator=(D&&) = default; // força uma atribuição de movimento de qualquer forma 
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

DR | Aplicado a | Comportamento publicado | Comportamento correto [CWG 1353](<https://cplusplus.github.io/CWG/issues/1353.html>) | C++11 | as condições onde operadores de atribuição de movimento padronizados são
---|---|---
definidos como deletados não consideravam tipos de array multidimensionais | considera esses tipos
[CWG 1402](<https://cplusplus.github.io/CWG/issues/1402.html>) | C++11 | um operador de atribuição de movimento padronizado que chamaria
um operador de atribuição de cópia não-trivial era
deletado; um operador de atribuição de movimento padronizado que
é deletado ainda participava da resolução de sobrecarga | permite a chamada para tal
operador de atribuição
de cópia; tornou-o ignorado
na resolução de sobrecarga
[CWG 1806](<https://cplusplus.github.io/CWG/issues/1806.html>) | C++11 | a especificação para um operador de atribuição de movimento padronizado
---|---|---
envolvendo uma classe base virtual estava faltando | adicionada
[CWG 2094](<https://cplusplus.github.io/CWG/issues/2094.html>) | C++11 | um subobjeto volátil tornava um operador de atribuição de movimento
padronizado não-trivial ([CWG issue 496](<https://cplusplus.github.io/CWG/issues/496.html>)) | trivialidade não afetada
[CWG 2180](<https://cplusplus.github.io/CWG/issues/2180.html>) | C++11 | um operador de atribuição de movimento padronizado para a classe `T`
não era definido como deletado se `T` fosse abstrata e tivesse
classes base virtuais diretas não atribuíveis por movimento | o operador é definido
como deletado neste caso
[CWG 2595](<https://cplusplus.github.io/CWG/issues/2595.html>) | C++20 | um operador de atribuição de movimento não era elegível se houvesse
outro operador de atribuição de movimento que fosse mais
restrito, mas não satisfizesse suas restrições associadas | ele pode ser elegível neste caso
---|---
[CWG 2690](<https://cplusplus.github.io/CWG/issues/2690.html>) | C++11 | o operador de atribuição de movimento implicitamente definido para
tipos union não copiava a representação do objeto | eles copiam a representação
do objeto

### Veja também

  * [construtor](<#/doc/language/initializer_list>)
  * [construtor de conversão](<#/doc/language/converting_constructor>)
  * [atribuição de cópia](<#/doc/language/as_operator>)
  * [construtor de cópia](<#/doc/language/copy_constructor>)
  * [construtor padrão](<#/doc/language/default_constructor>)
  * [destrutor](<#/doc/language/destructor>)
  * [inicialização](<#/doc/language/initialization>)
    * [inicialização agregada](<#/doc/language/aggregate_initialization>)
    * [inicialização constante](<#/doc/language/constant_initialization>)
    * [inicialização de cópia](<#/doc/language/copy_initialization>)
    * [inicialização padrão](<#/doc/language/default_initialization>)
    * [inicialização direta](<#/doc/language/direct_initialization>)
    * [inicialização por lista](<#/doc/language/list_initialization>)
    * [inicialização de referência](<#/doc/language/reference_initialization>)
    * [inicialização por valor](<#/doc/language/value_initialization>)
    * [inicialização por zero](<#/doc/language/zero_initialization>)
  * [construtor de movimento](<#/doc/language/move_constructor>)
