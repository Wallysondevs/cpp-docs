# Operador de atribuição de cópia

Um operador de atribuição de cópia é uma [função membro não estática](<#/doc/language/member_functions>) não-template com o nome operator= que pode ser chamada com um argumento do mesmo tipo de classe e copia o conteúdo do argumento sem mutá-lo.

### Sintaxe

Para a sintaxe formal do operador de atribuição de cópia, veja [declaração de função](<#/doc/language/function>). A lista de sintaxe abaixo demonstra apenas um subconjunto de todas as sintaxes válidas de operador de atribuição de cópia.

---
```cpp
return-type `operator=(` parameter-list ﻿`);`  // (1)
return-type `operator=(` parameter-list ﻿`)` function-body  // (2)
return-type `operator=(` parameter-list-no-default ﻿`) = default;`  // (3) (desde C++11)
return-type `operator=(` parameter-list ﻿`) = delete;`  // (4) (desde C++11)
return-type class-name ﻿`::`operator=(` parameter-list ﻿`)` function-body  // (5)
return-type class-name ﻿`::`operator=(` parameter-list-no-default ﻿`) = default;`  // (6) (desde C++11)
```
- **class-name** — a classe cujo operador de atribuição de cópia está sendo declarado, o tipo de classe é dado como `T` nas descrições abaixo
- **parameter-list** — uma [lista de parâmetros](<#/doc/language/function>) de apenas um parâmetro, que é do tipo `T`, `T&`, const T&, volatile T& ou const volatile T&
- **parameter-list-no-default** — uma [lista de parâmetros](<#/doc/language/function>) de apenas um parâmetro, que é do tipo `T`, `T&`, const T&, volatile T& ou const volatile T& e não possui um argumento padrão
- **function-body** — o [corpo da função](<#/doc/language/initializer_list>) do operador de atribuição de cópia
- **return-type** — qualquer tipo, mas `T&` é preferido para permitir o encadeamento de atribuições

### Explicação

1) Declaração de um operador de atribuição de cópia dentro da definição da classe.

2-4) Definição de um operador de atribuição de cópia dentro da definição da classe.

3) O operador de atribuição de cópia é explicitamente padronizado.

4) O operador de atribuição de cópia é deletado.

5,6) Definição de um operador de atribuição de cópia fora da definição da classe (a classe deve conter uma declaração (1)).

6) O operador de atribuição de cópia é explicitamente padronizado.
```cpp
    struct X
    {
        X& operator=(X& other);     // copy assignment operator
        X operator=(X other);       // pass-by-value is allowed
    //  X operator=(const X other); // Error: incorrect parameter type
    };
    
    union Y
    {
        // copy assignment operators can have syntaxes not listed above,
        // as long as they follow the general function declaration syntax
        // and do not viloate the restrictions listed above
        auto operator=(Y& other) -> Y&;       // OK: trailing return type
        Y& operator=(this Y& self, Y& other); // OK: explicit object parameter
    //  Y& operator=(Y&, int num = 1);        // Error: has other non-object parameters
    };
```

O operador de atribuição de cópia é chamado sempre que selecionado pela [resolução de sobrecarga](<#/doc/language/overload_resolution>), por exemplo, quando um objeto aparece no lado esquerdo de uma expressão de atribuição.

### Operador de atribuição de cópia implicitamente declarado

Se nenhum operador de atribuição de cópia definido pelo usuário for fornecido para um tipo de classe, o compilador sempre declarará um como um membro público inline da classe. Este operador de atribuição de cópia implicitamente declarado tem a forma T& T::operator=(const T&) se tudo o que se segue for verdadeiro:

  * cada base direta `B` de `T` possui um operador de atribuição de cópia cujos parâmetros são `B` ou const B& ou const volatile B&;
  * cada membro de dados não estático `M` de `T` do tipo de classe ou array de tipo de classe possui um operador de atribuição de cópia cujos parâmetros são `M` ou const M& ou const volatile M&.

Caso contrário, o operador de atribuição de cópia implicitamente declarado é declarado como T& T::operator=(T&).

Devido a essas regras, o operador de atribuição de cópia implicitamente declarado não pode se ligar a um argumento lvalue volátil.

Uma classe pode ter múltiplos operadores de atribuição de cópia, por exemplo, ambos T& T::operator=(T&) e T& T::operator=(T). Se alguns operadores de atribuição de cópia definidos pelo usuário estiverem presentes, o usuário ainda pode forçar a geração do operador de atribuição de cópia implicitamente declarado com a palavra-chave default. (desde C++11)

O operador de atribuição de cópia implicitamente declarado (ou padronizado em sua primeira declaração) possui uma especificação de exceção conforme descrito em [especificação de exceção dinâmica](<#/doc/language/except_spec>)(até C++17)[especificação noexcept](<#/doc/language/noexcept_spec>)(desde C++17)

Como o operador de atribuição de cópia é sempre declarado para qualquer classe, o operador de atribuição da classe base é sempre ocultado. Se uma [declaração using](<#/doc/language/using_declaration>) for usada para trazer o operador de atribuição da classe base, e seu tipo de argumento puder ser o mesmo que o tipo de argumento do operador de atribuição implícito da classe derivada, a declaração using também será ocultada pela declaração implícita.

### Operador de atribuição de cópia implicitamente definido

Se o operador de atribuição de cópia implicitamente declarado não for nem deletado nem trivial, ele é definido (ou seja, um corpo de função é gerado e compilado) pelo compilador se [odr-usado](<#/doc/language/definition>) ou [necessário para avaliação constante](<#/doc/language/constant_expression>)(desde C++14). Para tipos union, a atribuição de cópia implicitamente definida copia a representação do objeto (como por [std::memmove](<#/doc/string/byte/memmove>)). Para tipos de classe não-union, o operador realiza a atribuição de cópia membro a membro das bases diretas do objeto e dos membros de dados não estáticos, em sua ordem de inicialização, usando atribuição embutida para os escalares, atribuição de cópia membro a membro para arrays, e operador de atribuição de cópia para tipos de classe (chamado não-virtualmente).

O operador de atribuição de cópia implicitamente definido para uma classe `T` é [`constexpr`](<#/doc/language/constexpr>) se

  * `T` é um [tipo literal](<#/doc/named_req/LiteralType>), e
  * o operador de atribuição selecionado para copiar cada subobjeto de classe base direta é uma função constexpr, e
  * para cada membro de dados não estático de `T` que é do tipo de classe (ou array disso), o operador de atribuição selecionado para copiar esse membro é uma função constexpr.

```cpp
  // (desde C++14)
(até C++23)
O operador de atribuição de cópia implicitamente definido para uma classe `T` é `constexpr`.  // (desde C++23)
```

A geração do operador de atribuição de cópia implicitamente definido é descontinuada se `T` tiver um destrutor declarado pelo usuário ou um construtor de cópia declarado pelo usuário. | (desde C++11)

### Operador de atribuição de cópia deletado

Um operador de atribuição de cópia implicitamente declarado ou explicitamente padronizado (desde C++11) para a classe `T` é indefinido (até C++11) definido como deletado (desde C++11) se qualquer uma das seguintes condições for satisfeita:

  * `T` possui um membro de dados não estático de um tipo não-classe qualificado como const (ou possivelmente um array multidimensional disso).
  * `T` possui um membro de dados não estático de um tipo de referência.
  * `T` possui um [subobjeto potencialmente construído](<#/doc/language/objects>) do tipo de classe `M` (ou possivelmente um array multidimensional disso) de tal forma que a resolução de sobrecarga aplicada para encontrar o operador de atribuição de cópia de `M`

    

  * não resulta em um candidato utilizável, ou
  * no caso do subobjeto ser um [membro variante](<#/doc/language/union>), seleciona uma função não-trivial.

```cpp
O operador de atribuição de cópia implicitamente declarado para a classe `T` é definido como deletado se `T` declarar um construtor de movimento ou operador de atribuição de movimento.  // (desde C++11)
```

### Operador de atribuição de cópia trivial

O operador de atribuição de cópia para a classe `T` é trivial se tudo o que se segue for verdadeiro:

  * não é fornecido pelo usuário (ou seja, é implicitamente definido ou padronizado);
  * `T` não possui funções membro virtuais;
  * `T` não possui classes base virtuais;
  * o operador de atribuição de cópia selecionado para cada base direta de `T` é trivial;
  * o operador de atribuição de cópia selecionado para cada membro de tipo de classe não estático (ou array de tipo de classe) de `T` é trivial.

Um operador de atribuição de cópia trivial faz uma cópia da representação do objeto como se fosse por [std::memmove](<#/doc/string/byte/memmove>). Todos os tipos de dados compatíveis com a linguagem C (tipos POD) são trivialmente copiáveis por atribuição.

### Operador de atribuição de cópia elegível

Um operador de atribuição de cópia é elegível se for declarado pelo usuário ou implicitamente declarado e definível. | (até C++11)
---|---
Um operador de atribuição de cópia é elegível se não for deletado. | (desde C++11)
(até C++20)
Um operador de atribuição de cópia é elegível se todas as seguintes condições forem satisfeitas:

  * Não é deletado.
  * Suas [restrições associadas](<#/doc/language/constraints>) (se houver) são satisfeitas.
  * Nenhum operador de atribuição de cópia cujas restrições associadas são satisfeitas é [mais restrito](<#/doc/language/constraints>).

| (desde C++20)

A trivialidade dos operadores de atribuição de cópia elegíveis determina se a classe é um [tipo trivialmente copiável](<#/doc/named_req/TriviallyCopyable>).

### Notas

Se ambos os operadores de atribuição de cópia e de movimento forem fornecidos, a resolução de sobrecarga seleciona a atribuição de movimento se o argumento for um [rvalue](<#/doc/language/value_category>) (seja um [prvalue](<#/doc/language/value_category>) como um temporário sem nome ou um [xvalue](<#/doc/language/value_category>) como o resultado de [`std::move`](<#/doc/utility/move>)), e seleciona a atribuição de cópia se o argumento for um [lvalue](<#/doc/language/value_category>) (objeto nomeado ou uma função/operador que retorna uma referência lvalue). Se apenas a atribuição de cópia for fornecida, todas as categorias de argumento a selecionarão (desde que ela receba seu argumento por valor ou como referência a const, já que rvalues podem se ligar a referências const), o que torna a atribuição de cópia o fallback para a atribuição de movimento, quando o movimento não está disponível.

É não especificado se subobjetos de classe base virtual que são acessíveis por mais de um caminho na hierarquia de herança são atribuídos mais de uma vez pelo operador de atribuição de cópia implicitamente definido (o mesmo se aplica à [atribuição de movimento](<#/doc/language/move_operator>)).

Veja [sobrecarga do operador de atribuição](<#/doc/language/operators>) para detalhes adicionais sobre o comportamento esperado de um operador de atribuição de cópia definido pelo usuário.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <memory>
    #include <string>
    
    struct A
    {
        int n;
        std::string s1;
    
        A() = default;
        A(A const&) = default;
    
        // user-defined copy assignment (copy-and-swap idiom)
        A& operator=(A other)
        {
            std::cout << "copy assignment of A\n";
            std::swap(n, other.n);
            std::swap(s1, other.s1);
            return *this;
        }
    };
    
    struct B : A
    {
        std::string s2;
        // implicitly-defined copy assignment
    };
    
    struct C
    {
        std::unique_ptr<int[]> data;
        std::size_t size;
    
        // user-defined copy assignment (non copy-and-swap idiom)
        // note: copy-and-swap would always reallocate resources
        C& operator=(const C& other)
        {
            if (this != &other) // not a self-assignment
            {
                if (size != other.size) // resource cannot be reused
                {
                    data.reset(new int[other.size]);
                    size = other.size;
                }
                std::copy(&other.data[0], &other.data[0] + size, &data[0]);
            }
            return *this;
        }
    };
    
    int main()
    {
        A a1, a2;
        std::cout << "a1 = a2 calls ";
        a1 = a2; // user-defined copy assignment
    
        B b1, b2;
        b2.s1 = "foo";
        b2.s2 = "bar";
        std::cout << "b1 = b2 calls ";
        b1 = b2; // implicitly-defined copy assignment
    
        std::cout << "b1.s1 = " << b1.s1 << "; b1.s2 = " << b1.s2 << '\n';
    }
```

Saída:
```
    a1 = a2 calls copy assignment of A
    b1 = b2 calls copy assignment of A
    b1.s1 = foo; b1.s2 = bar
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1353](<https://cplusplus.github.io/CWG/issues/1353.html>) | C++98 | as condições onde operadores de atribuição de cópia implicitamente declarados eram indefinidos não consideravam tipos de array multidimensionais | considerar esses tipos
[CWG 2094](<https://cplusplus.github.io/CWG/issues/2094.html>) | C++11 | um subobjeto volátil tornava operadores de atribuição de cópia padronizados não-triviais ([CWG issue 496](<https://cplusplus.github.io/CWG/issues/496.html>)) | trivialidade não afetada
[CWG 2171](<https://cplusplus.github.io/CWG/issues/2171.html>) | C++11 | operator=(X&) = default era não-trivial | tornou-se trivial
[CWG 2180](<https://cplusplus.github.io/CWG/issues/2180.html>) | C++11 | um operador de atribuição de cópia padronizado para a classe `T` não era definido como deletado se `T` fosse abstrata e tivesse classes base virtuais diretas não copiáveis por atribuição | o operador é definido como deletado neste caso
[CWG 2595](<https://cplusplus.github.io/CWG/issues/2595.html>) | C++20 | um operador de atribuição de cópia não era elegível se houvesse outro operador de atribuição de cópia que fosse mais restrito, mas não satisfizesse suas restrições associadas | ele pode ser elegível neste caso

### Veja também

  * [construtor de conversão](<#/doc/language/converting_constructor>)
  * [construtor de cópia](<#/doc/language/copy_constructor>)
  * [eliminação de cópia](<#/doc/language/copy_elision>)
  * [construtor padrão](<#/doc/language/default_constructor>)
  * [destrutor](<#/doc/language/destructor>)
  * [`explicit`](<#/doc/language/explicit>)
  * [inicialização](<#/doc/language/initialization>)
    * [inicialização de agregado](<#/doc/language/aggregate_initialization>)
    * [inicialização constante](<#/doc/language/constant_initialization>)
    * [inicialização de cópia](<#/doc/language/copy_initialization>)
    * [inicialização padrão](<#/doc/language/default_initialization>)
    * [inicialização direta](<#/doc/language/direct_initialization>)
    * [lista de inicializadores](<#/doc/language/initializer_list>)
    * [inicialização de lista](<#/doc/language/list_initialization>)
    * [inicialização de referência](<#/doc/language/reference_initialization>)
    * [inicialização por valor](<#/doc/language/value_initialization>)
    * [inicialização zero](<#/doc/language/zero_initialization>)
  * [atribuição de movimento](<#/doc/language/move_operator>)
  * [construtor de movimento](<#/doc/language/move_constructor>)
  * [`new`](<#/doc/language/new>)
