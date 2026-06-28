# Lançando exceções

Lançar uma [exceção](<#/doc/language/exceptions>) transfere o controle para um [manipulador](<#/doc/language/catch>).

Uma exceção pode ser lançada a partir de [expressões throw](<#/doc/language/throw>), os seguintes contextos também podem lançar exceções:

  * [funções de alocação](<#/doc/memory/new/operator_new>)
  * [`dynamic_cast`](<#/doc/language/dynamic_cast>)
  * [`typeid`](<#/doc/language/typeid>)
  * [expressões new](<#/doc/language/new>)
  * [funções da standard library](<#/doc/standard_library>)

### Objeto de exceção

Lançar uma exceção inicializa um objeto com [duração de armazenamento](<#/doc/language/storage_duration>) dinâmica, chamado de _objeto de exceção_.

Se o tipo do objeto de exceção for um dos seguintes tipos, o programa é malformado:

  * um [tipo incompleto](<#/doc/language/type-id>)
  * um [tipo de classe abstrata](<#/doc/language/abstract_class>)
  * um ponteiro para um tipo incompleto diferente de (possivelmente cv-qualified) void

#### Construindo e destruindo objetos de exceção

Dado o tipo do objeto de exceção como `T`:

  * Seja obj um lvalue do tipo const T, a [inicialização por cópia](<#/doc/language/copy_initialization>) de um objeto do tipo `T` a partir de obj deve ser bem-formada.
  * Se `T` é um tipo de classe:

    

  * O [construtor](<#/doc/language/initializer_list>) selecionado é [odr-used](<#/doc/language/definition>).
  * O [destrutor](<#/doc/language/destructor>) de `T` é [potencialmente invocado](<#/doc/language/destructor>).

A memória para o objeto de exceção é alocada de uma maneira não especificada. A única garantia é que o armazenamento nunca será alocado por [funções de alocação](<#/doc/memory/new/operator_new>) globais.

Se um [manipulador](<#/doc/language/catch>) sai [relançando](<#/doc/language/throw>), o controle é passado para outro manipulador para o mesmo objeto de exceção. O objeto de exceção não é destruído neste caso.

Quando o último manipulador ativo restante para a exceção sai por qualquer meio que não seja relançar, o objeto de exceção é destruído e a implementação pode desalocar a memória para o objeto temporário de uma maneira não especificada. A destruição ocorre imediatamente após a destruição do objeto declarado na "lista de parâmetros" no manipulador. | (até C++11)
Os pontos de destruição potencial para o objeto de exceção são:

  * Quando um manipulador ativo para a exceção sai por qualquer meio que não seja relançar, imediatamente após a destruição do objeto (se houver) declarado na "lista de parâmetros" no manipulador.
  * Quando um objeto do tipo [std::exception_ptr](<#/doc/error/exception_ptr>) que se refere ao objeto de exceção é destruído, antes que o destrutor de [std::exception_ptr](<#/doc/error/exception_ptr>) retorne.

Entre todos os pontos de destruição potencial para o objeto de exceção, há um último ponto não especificado onde o objeto de exceção é destruído. Todos os outros pontos [acontecem antes](<#/doc/language/multithread>) desse último. A implementação pode então desalocar a memória para o objeto de exceção de uma maneira não especificada. | (desde C++11)

### Expressões throw

---
`throw` expressão | (1) |
---|---|---
`throw` | (2) |
  
1) Lança uma nova exceção.

2) Relança a exceção atualmente sendo manipulada.

- **expression** — a expressão usada para construir o objeto de exceção
  
Quando uma nova exceção é lançada, seu objeto de exceção é determinado da seguinte forma:

  1. As conversões padrão [array-to-pointer](<#/doc/language/implicit_cast>) e [function-to-pointer](<#/doc/language/implicit_cast>) são realizadas na expression.
  2. Seja ex o resultado da conversão:

    

    

  * O tipo do objeto de exceção é determinado removendo quaisquer cv-qualifiers de nível superior do tipo de ex.
  * O objeto de exceção é [inicializado por cópia](<#/doc/language/copy_initialization>) a partir de ex.

Se um programa tentar relançar uma exceção quando nenhuma exceção estiver sendo manipulada, [std::terminate](<#/doc/error/terminate>) será invocado. Caso contrário, a exceção é reativada com o objeto de exceção existente (nenhum novo objeto de exceção é criado), e a exceção não é mais considerada capturada.
```cpp
    try
    {
        // throwing a new exception 123
        throw 123;
    }
    catch (...) // catch all exceptions
    {
        // respond (partially) to exception 123
        throw; // pass the exception to some other handler
    }
```

### Desenrolamento da pilha

Uma vez que o objeto de exceção é construído, o fluxo de controle funciona para trás (subindo a pilha de chamadas) até atingir o início de um [bloco try](<#/doc/language/try>), momento em que os parâmetros de todos os manipuladores associados são comparados, em ordem de aparição, com o tipo do objeto de exceção para encontrar uma [correspondência](<#/doc/language/catch>). Se nenhuma correspondência for encontrada, o fluxo de controle continua a desenrolar a pilha até o próximo bloco try, e assim por diante. Se uma correspondência for encontrada, o fluxo de controle salta para o manipulador correspondente.

À medida que o fluxo de controle sobe a pilha de chamadas, os destrutores são invocados para todos os objetos com [duração de armazenamento automática](<#/doc/language/storage_duration>) que são construídos, mas ainda não destruídos, desde que o bloco try correspondente foi inserido, na ordem inversa de conclusão de seus construtores. Se uma exceção é lançada de um destrutor de uma variável local ou de um temporário usado em uma instrução [return](<#/doc/language/return>), o destrutor para o objeto retornado da função também é invocado.

Se uma exceção é lançada de um construtor ou (raro) de um destrutor de um objeto (independentemente da duração de armazenamento do objeto), os destrutores são chamados para todos os membros não estáticos, não variantes e classes base totalmente construídos, na ordem inversa de conclusão de seus construtores. Membros variantes de [classes tipo union](<#/doc/language/union>) são destruídos apenas no caso de desenrolamento do construtor, e se o membro ativo mudou entre a inicialização e a destruição, o comportamento é indefinido.

Se um construtor delegante sai com uma exceção depois que o construtor não delegante foi concluído com sucesso, o destrutor para este objeto é chamado. | (desde C++11)
  
Se a exceção é lançada de um construtor que é invocado por uma [expressão new](<#/doc/language/new>), a [função de desalocação](<#/doc/memory/new/operator_delete>) correspondente é chamada, se disponível.

Este processo é chamado de _desenrolamento da pilha_.

Se qualquer função que é chamada diretamente pelo mecanismo de desenrolamento da pilha, após a inicialização do objeto de exceção e antes do início do manipulador de exceção, sai com uma exceção, [std::terminate](<#/doc/error/terminate>) é chamado. Tais funções incluem [destrutores](<#/doc/language/destructor>) de objetos com duração de armazenamento automática cujos escopos são encerrados, e o construtor de cópia do objeto de exceção que é chamado (se não [elidido](<#/doc/language/copy_elision>)) para inicializar argumentos passados por valor (catch-by-value).

Se uma exceção é lançada e não capturada, incluindo exceções que escapam da função inicial de [std::thread](<#/doc/thread/thread>), da função main, e do construtor ou destrutor de quaisquer objetos estáticos ou thread-local, então [std::terminate](<#/doc/error/terminate>) é chamado. É definido pela implementação se algum desenrolamento da pilha ocorre para exceções não capturadas.

### Notas

Ao relançar exceções, a segunda forma deve ser usada para evitar o fatiamento de objeto (object slicing) no caso (típico) em que os objetos de exceção usam herança:
```cpp
    try
    {
        std::string("abc").substr(10); // throws std::out_of_range
    }
    catch (const std::exception& e)
    {
        std::cout << e.what() << '\n';
    //  throw e; // copy-initializes a new exception object of type std::exception
        throw;   // rethrows the exception object of type std::out_of_range
    }
```

A expressão throw é classificada como uma [expressão prvalue](<#/doc/language/value_category>) do tipo void. Como qualquer outra expressão, ela pode ser uma subexpressão em outra expressão, mais comumente no [operador condicional](<#/doc/language/operator_other>):
```cpp
    double f(double d)
    {
        return d > 1e7 ? throw std::overflow_error("too big") : d;
    }
    
    int main()
    {
        try
        {
            std::cout << f(1e10) << '\n';
        }
        catch (const std::overflow_error& e)
        {
            std::cout << e.what() << '\n';
        }
    }
```

### Palavras-chave

[`throw`](<#/doc/keyword/throw>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <stdexcept>
    
    struct A
    {
        int n;
    
        A(int n = 0): n(n) { std::cout << "A(" << n << ") constructed successfully\n"; }
        ~A() { std::cout << "A(" << n << ") destroyed\n"; }
    };
    
    int foo()
    {
        throw std::runtime_error("error");
    }
    
    struct B
    {
        A a1, a2, a3;
    
        B() try : a1(1), a2(foo()), a3(3)
        {
            std::cout << "B constructed successfully\n";
        }
        catch(...)
        {
            std::cout << "B::B() exiting with exception\n";
        }
    
        ~B() { std::cout << "B destroyed\n"; }
    };
    
    struct C : A, B
    {
        C() try
        {
            std::cout << "C::C() completed successfully\n";
        }
        catch(...)
        {
            std::cout << "C::C() exiting with exception\n";
        }
    
        ~C() { std::cout << "C destroyed\n"; }
    };
    
    int main () try
    {
        // creates the A base subobject
        // creates the a1 member of B
        // fails to create the a2 member of B
        // unwinding destroys the a1 member of B
        // unwinding destroys the A base subobject
        C c;
    }
    catch (const std::exception& e)
    {
        std::cout << "main() failed to create C with: " << e.what();
    }
```

Saída:
```
    A(0) constructed successfully
    A(1) constructed successfully
    A(1) destroyed
    B::B() exiting with exception
    A(0) destroyed
    C::C() exiting with exception
    main() failed to create C with: error
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 499](<https://cplusplus.github.io/CWG/issues/499.html>) | C++98 | um array com limite desconhecido não podia ser lançado porque seu tipo é incompleto, mas um objeto de exceção pode ser criado a partir do ponteiro decaído sem nenhum problema | aplicar o requisito de completude de tipo ao objeto de exceção em vez disso
[CWG 668](<https://cplusplus.github.io/CWG/issues/668.html>) | C++98 | [std::terminate](<#/doc/error/terminate>) não era chamado se uma exceção fosse lançada do destrutor de um objeto local não automático | chamar [std::terminate](<#/doc/error/terminate>) neste caso
[CWG 1863](<https://cplusplus.github.io/CWG/issues/1863.html>) | C++11 | construtor de cópia não era exigido para objetos de exceção somente-movíveis quando lançados, mas a cópia era permitida posteriormente | construtor de cópia exigido
[CWG 1866](<https://cplusplus.github.io/CWG/issues/1866.html>) | C++98 | membros variantes vazavam no desenrolamento da pilha a partir do construtor | membros variantes destruídos
[CWG 2176](<https://cplusplus.github.io/CWG/issues/2176.html>) | C++98 | lançar de um destrutor de variável local poderia pular o destrutor do valor de retorno | valor de retorno da função adicionado ao desenrolamento
[CWG 2699](<https://cplusplus.github.io/CWG/issues/2699.html>) | C++98 | throw "EX" na verdade lançaria char* em vez de const char* | corrigido
[CWG 2711](<https://cplusplus.github.io/CWG/issues/2711.html>) | C++98 | a origem da inicialização por cópia do objeto de exceção não era especificada | inicializado por cópia a partir da expressão
[CWG 2775](<https://cplusplus.github.io/CWG/issues/2775.html>) | C++98 | o requisito de inicialização por cópia do objeto de exceção não era claro | esclarecido
[CWG 2854](<https://cplusplus.github.io/CWG/issues/2854.html>) | C++98 | a duração de armazenamento dos objetos de exceção não era clara | esclarecido
[P1825R0](<https://wg21.link/P1825R0>) | C++11 | movimento implícito de parâmetros era proibido em `throw` | permitido

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 7.6.18 Throwing an exception [expr.throw]

    

  * 14.2 Throwing an exception [except.throw]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 7.6.18 Throwing an exception [expr.throw]

    

  * 14.2 Throwing an exception [except.throw]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 8.17 Throwing an exception [expr.throw]

    

  * 18.1 Throwing an exception [except.throw]

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 15.1 Throwing an exception [except.throw]

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 15.1 Throwing an exception [except.throw]

  * Padrão C++03 (ISO/IEC 14882:2003):

    

  * 15.1 Throwing an exception [except.throw]

  * Padrão C++98 (ISO/IEC 14882:1998):

    

  * 15.1 Throwing an exception [except.throw]

### Veja também

  * [copy elision](<#/doc/language/copy_elision>)
  * [try block](<#/doc/language/try>)
  * [handler](<#/doc/language/catch>)
  * [noexcept specifier](<#/doc/language/noexcept_spec>)
  * [Tratamento de exceções](<#/doc/error>)

  * [especificações de exceção dinâmicas](<#/doc/language/except_spec>)

| (até C++17)