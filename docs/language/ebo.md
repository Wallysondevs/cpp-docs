# Otimização de base vazia

Permite que o tamanho de um subobjeto base vazio seja zero.

### Explicação

O tamanho de qualquer [objeto](<#/doc/language/objects>) ou subobjeto membro é exigido ser de pelo menos 1, mesmo que o tipo seja um [tipo de classe](<#/doc/language/class>) vazio (isto é, uma classe ou struct que não possui membros de dados não estáticos), (a menos que com `[[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]`, veja abaixo)(desde C++20) a fim de garantir que os endereços de objetos distintos do mesmo tipo sejam sempre distintos.

No entanto, subobjetos de classes base não são tão restritos, e podem ser completamente otimizados do layout do objeto:

Execute este código
```cpp
    struct Base {}; // empty class
    
    struct Derived1 : Base
    {
        int i;
    };
    
    int main()
    {
        // the size of any object of empty class type is at least 1
        static_assert(sizeof(Base) >= 1);
    
        // empty base optimization applies
        static_assert(sizeof(Derived1) == sizeof(int));
    }
```

A otimização de base vazia é proibida se uma das classes base vazias for também o tipo ou a base do tipo do primeiro membro de dados não estático, já que os dois subobjetos base do mesmo tipo são obrigados a ter endereços diferentes dentro da representação do objeto do tipo mais derivado.

Um exemplo típico de tal situação é a implementação ingênua de [std::reverse_iterator](<#/doc/iterator/reverse_iterator>) (derivado da base vazia [std::iterator](<#/doc/iterator/iterator>)), que mantém o iterator subjacente (também derivado de [std::iterator](<#/doc/iterator/iterator>)) como seu primeiro membro de dados não estático.

Execute este código
```cpp
    struct Base {}; // empty class
    
    struct Derived1 : Base
    {
        int i;
    };
    
    struct Derived2 : Base
    {
        Base c; // Base, occupies 1 byte, followed by padding for i
        int i;
    };
    
    struct Derived3 : Base
    {
        Derived1 c; // derived from Base, occupies sizeof(int) bytes
        int i;
    };
    
    int main()
    {
        // empty base optimization does not apply,
        // base occupies 1 byte, Base member occupies 1 byte
        // followed by 2 bytes of padding to satisfy int alignment requirements
        static_assert(sizeof(Derived2) == 2*sizeof(int));
    
        // empty base optimization does not apply,
        // base takes up at least 1 byte plus the padding
        // to satisfy alignment requirement of the first member (whose
        // alignment is the same as int)
        static_assert(sizeof(Derived3) == 3*sizeof(int));
    }
```

Se ocorrer herança múltipla, então as otimizações específicas são dependentes do compilador.

  * Em MSVC, a otimização de classe base nula é aplicada com e somente com a última classe base nula; o restante das classes base nulas não recebe a otimização de base nula e um byte é alocado.
  * Em GCC, não importa quantas classes base vazias existam, a classe base vazia aplica a otimização de classe base vazia sem alocar nenhum espaço, e o endereço da classe base vazia é o mesmo que o primeiro endereço do objeto da classe derivada.

A otimização de base vazia é _exigida_ para [StandardLayoutTypes](<#/doc/named_req/StandardLayoutType>) a fim de manter o requisito de que o ponteiro para um objeto de layout padrão, convertido usando [`reinterpret_cast`](<#/doc/language/reinterpret_cast>), aponte para seu membro inicial, razão pela qual os requisitos para um tipo de layout padrão incluem "ter todos os membros de dados não estáticos declarados na mesma classe (seja todos na derivada ou todos em alguma base)" e "não ter classes base do mesmo tipo que o primeiro membro de dados não estático". | (desde C++11)
Os subobjetos de membros vazios podem ser otimizados da mesma forma que as bases vazias se eles usarem o atributo `[[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]`. Obter o endereço de tal membro resulta em um endereço que pode ser igual ao endereço de algum outro membro do mesmo objeto. Execute este código
```cpp
    struct Empty {}; // empty class
    
    struct X
    {
        int i;
        [[no_unique_address]] Empty e;
    };
    
    int main()
    {
        // the size of any object of empty class type is at least 1
        static_assert(sizeof(Empty) >= 1);
    
        // empty member optimized out:
        static_assert(sizeof(X) == sizeof(int));
    }
```

| (desde C++20)

### Notas

A otimização de base vazia é comumente usada por classes da standard library cientes de alocadores ([std::vector](<#/doc/container/vector>), [std::function](<#/doc/utility/functional/function>), [std::shared_ptr](<#/doc/memory/shared_ptr>), etc) para evitar ocupar qualquer armazenamento adicional para seu membro alocador se o alocador for stateless. Isso é alcançado armazenando um dos membros de dados necessários (por exemplo, ponteiro `begin`, `end` ou `capacity` para o `vector`) em um equivalente de [`boost::compressed_pair`](<https://www.boost.org/doc/libs/release/libs/utility/doc/html/utility/utilities/compressed_pair.html>) com o alocador.

### Referências

  * C++23 standard (ISO/IEC 14882:2024):

    

  * 7.6.10 Equality operators [expr.eq]

    

  * 7.6.2.5 Sizeof [expr.sizeof]

    

  * 11 Classes [class]

    

  * 11.4 Class members [class.mem]

  * C++20 standard (ISO/IEC 14882:2020):

    

  * 7.6.10 Equality operators [expr.eq]

    

  * 7.6.2.4 Sizeof [expr.sizeof]

    

  * 11 Classes [class]

    

  * 11.4 Class members [class.mem]

  * C++17 standard (ISO/IEC 14882:2017):

    

  * 8.10 Equality operators [expr.eq]

    

  * 8.3.3 Sizeof [expr.sizeof]

    

  * 12 Classes [class]

    

  * 12.2 Class members [class.mem]

  * C++14 standard (ISO/IEC 14882:2014):

    

  * 5.10 Equality operators [expr.eq]

    

  * 5.3.3 Sizeof [expr.sizeof]

    

  * 9 Classes [class]

    

  * 9.2 Class members [class.mem]

  * C++11 standard (ISO/IEC 14882:2011):

    

  * 5.10 Equality operators [expr.eq] (p: 2)

    

  * 5.3.3 Sizeof [expr.sizeof] (p: 2)

    

  * 9 Classes [class] (p: 4,7)

    

  * 9.2 Class members [class.mem] (p: 20)

  * C++98 standard (ISO/IEC 14882:1998):

    

  * 5.10 Equality operators [expr.eq] (p: 2)

    

  * 5.3.3 Sizeof [expr.sizeof] (p: 2)

    

  * 9 Classes [class] (p: 3)

### Links externos

[More C++ Idioms/Empty Base Optimization](<https://en.wikibooks.org/wiki/More_C%2B%2B_Idioms/Empty_Base_Optimization>) — Um wikilivro
---