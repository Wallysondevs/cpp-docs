# Tempo de Vida

Todo [objeto](<#/doc/language/objects>) e [referência](<#/doc/language/reference>) possui um _tempo de vida_ , que é uma propriedade de tempo de execução: para qualquer objeto ou referência, há um ponto de execução de um programa em que seu tempo de vida começa, e há um momento em que ele termina.

O tempo de vida de um objeto começa quando:

  * armazenamento com o alinhamento e tamanho adequados para seu tipo é obtido, e
  * sua inicialização (se houver) é completa (incluindo [inicialização padrão](<#/doc/language/default_initialization>) via nenhum construtor ou [construtor padrão trivial](<#/doc/language/default_constructor>)), exceto que

    

  * se o objeto é um [membro de união](<#/doc/language/union>) ou subobjeto dele, seu tempo de vida só começa se esse membro da união for o membro inicializado na união, ou se ele for ativado,
  * se o objeto está aninhado em um objeto de união, seu tempo de vida pode começar se o objeto de união contendo for atribuído ou construído por uma função membro especial trivial,
  * o tempo de vida de um objeto array também pode começar se ele for alocado por [std::allocator::allocate](<#/doc/memory/allocator/allocate>).

Algumas operações [criam objetos implicitamente](<#/doc/language/objects>) de [tipos de tempo de vida implícito](<#/doc/language/type-id>) em uma dada região de armazenamento e iniciam seu tempo de vida. Se um subobjeto de um objeto criado implicitamente não for de um tipo de tempo de vida implícito, seu tempo de vida não começa implicitamente.

O tempo de vida de um objeto termina quando:

  * se for de um tipo não-classe, o objeto é destruído (talvez via uma chamada de pseudo-destrutor), ou
  * se for de um tipo classe, a chamada do [destrutor](<#/doc/language/destructor>) começa, ou
  * o armazenamento que o objeto ocupa é liberado, ou é [reutilizado](<#/doc/language/lifetime>) por um objeto que não está aninhado dentro dele.

O tempo de vida de um objeto é igual ou está aninhado dentro do tempo de vida de seu armazenamento, veja [duração de armazenamento](<#/doc/language/storage_duration>).

O tempo de vida de uma [referência](<#/doc/language/reference>) começa quando sua inicialização é completa e termina como se fosse um objeto escalar.

Nota: o tempo de vida do objeto referenciado pode terminar antes do fim do tempo de vida da referência, o que torna [referências pendentes](<#/doc/language/reference>) possíveis.

Os tempos de vida de membros de dados não-estáticos e subobjetos base começam e terminam seguindo a [ordem de inicialização da classe](<#/doc/language/initializer_list>).

### Tempo de vida de objeto temporário

Objetos temporários são criados quando um prvalue é [materializado](<#/doc/language/implicit_cast>) para que possa ser usado como um glvalue, o que ocorre (desde C++17) nas seguintes situações:

  * [ligando uma referência a um prvalue](<#/doc/language/reference_initialization>)

  * [inicializando](<#/doc/language/list_initialization>) um objeto do tipo [std::initializer_list](<#/doc/utility/initializer_list>)&lt;T&gt; a partir de uma [lista de inicializadores entre chaves](<#/doc/language/initialization>)

| (desde C++11)  
  
  * retornando um prvalue de uma função
  * [conversão](<#/doc/language/expressions>) que cria um prvalue ([incluindo](<#/doc/language/explicit_cast>) T(a, b, c) e T{})

| 

  * [expressão lambda](<#/doc/language/lambda>)

| (desde C++11)  
  
  * [inicialização por cópia](<#/doc/language/copy_initialization>) que requer conversão do inicializador,
  * [inicialização por referência](<#/doc/language/reference_initialization>) para um tipo diferente, mas conversível, ou para um bitfield.

(até C++17)  
  
  * ao realizar [acesso a membro](<#/doc/language/operator_member_access>) em um prvalue de classe
  * ao realizar uma conversão de [array para ponteiro](<#/doc/language/array>) ou [indexação](<#/doc/language/operator_member_access>) em um prvalue de array
  * para operandos não avaliados em [`sizeof`](<#/doc/language/sizeof>) e [`typeid`](<#/doc/language/typeid>)
  * quando um prvalue aparece como uma [expressão de valor descartado](<#/doc/language/expressions>)

| (desde C++17)  
Além disso, objetos temporários são criados:

  * se suportado pela implementação, ao passar ou retornar um objeto de tipo trivially-copyable em uma [expressão de chamada de função](<#/doc/language/operator_other>) (isso permite passar structs em registradores da CPU)

A materialização de um objeto temporário é geralmente atrasada o máximo possível para evitar a criação de objetos temporários desnecessários: veja [copy elision](<#/doc/language/copy_elision>).  | (desde C++17)  
  
Todos os objetos temporários são destruídos como o último passo na avaliação da [full-expression](<#/doc/language/expressions>) que (lexicamente) contém o ponto onde foram criados, e se múltiplos objetos temporários foram criados, eles são destruídos na ordem oposta à ordem de criação. Isso é verdade mesmo que essa avaliação termine lançando uma exceção.

Existem as seguintes exceções a isso:

  * O tempo de vida de um objeto temporário pode ser estendido pela ligação a uma referência, veja [inicialização de referência](<#/doc/language/reference_initialization>) para detalhes.
  * O tempo de vida de um objeto temporário criado ao avaliar os argumentos padrão de um construtor padrão ou de cópia usado para inicializar ou copiar um elemento de um array termina antes que o próximo elemento do array comece a inicialização.

  * O tempo de vida de um objeto temporário criado em uma declaração de [structured binding](<#/doc/language/structured_binding>) (introduzido pelo inicializador para uma variável com nome único) é estendido até o final da declaração de structured binding.

| (desde C++17)  
  
  * O tempo de vida de um objeto temporário criado no range-initializer de uma instrução [range-for](<#/doc/language/range-for>) que de outra forma seria destruído no final do range-initializer é estendido até o final do corpo do loop.

| (desde C++23)  
  
### Reutilização de armazenamento

Um programa não é obrigado a chamar o destrutor de um objeto para encerrar seu tempo de vida se o objeto for [trivially-destructible](<#/doc/language/destructor>) (cuidado para que o comportamento correto do programa possa depender do destrutor). No entanto, se um programa encerra explicitamente o tempo de vida de um objeto não-trivially destructible que é uma variável, ele deve garantir que um novo objeto do mesmo tipo seja construído no local (por exemplo, via placement new) antes que o destrutor possa ser chamado implicitamente, ou seja, devido à saída do escopo ou exceção para objetos automáticos, devido à saída da thread para objetos thread-local, (desde C++11) ou devido à saída do programa para objetos estáticos; caso contrário, o comportamento é indefinido.
```cpp
    class T {}; // trivial
    
    struct B
    {
        ~B() {} // non-trivial
    };
    
    void x()
    {
        long long n; // automatic, trivial
        new (&n) double(3.14); // reuse with a different type okay
    } // okay
    
    void h()
    {
        B b; // automatic non-trivially destructible
        b.~B(); // end lifetime (not required, since no side-effects)
        new (&b) T; // wrong type: okay until the destructor is called
    } // destructor is called: undefined behavior
```

É comportamento indefinido reutilizar armazenamento que é ou foi ocupado por um objeto `const` completo de duração de armazenamento estática, thread-local, (desde C++11) ou automática porque tais objetos podem ser armazenados em memória somente leitura:
```cpp
    struct B
    {
        B(); // non-trivial
        ~B(); // non-trivial
    };
    const B b; // const static
    
    void h()
    {
        b.~B(); // end the lifetime of b
        new (const_cast<B*>(&b)) const B; // undefined behavior: attempted reuse of a const
    }
```

Ao avaliar uma [new expression](<#/doc/language/new>), o armazenamento é considerado reutilizado depois que é retornado da [função de alocação](<#/doc/memory/new/operator_new>), mas antes da avaliação do inicializador da new expression:
```cpp
    struct S
    {
        int m;
    };
    
    void f()
    {
        S x{1};
        new(&x) S(x.m); // undefined behavior: the storage is reused
    }
```

Se um novo objeto é criado no endereço que foi ocupado por outro objeto, então todos os ponteiros, referências e o nome do objeto original automaticamente se referirão ao novo objeto e, uma vez que o tempo de vida do novo objeto comece, podem ser usados para manipular o novo objeto, mas apenas se o objeto original for transparentemente substituível pelo novo objeto.

Se todas as seguintes condições forem satisfeitas, o objeto x é _transparentemente substituível_ pelo objeto y:

  * O armazenamento para y sobrepõe exatamente o local de armazenamento que x ocupava.
  * y é do mesmo tipo que x (ignorando os cv-qualifiers de nível superior).
  * x não é um objeto `const` completo.
  * Nem x nem y é um subobjeto de classe base, ou um subobjeto membro declarado com `[[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]` (desde C++20).
  * Uma das seguintes condições é satisfeita:

    

  * x e y são ambos objetos completos.
  * x e y são subobjetos diretos dos objetos ox e oy respectivamente, e ox é transparentemente substituível por oy.

```cpp
    struct C
    {
        int i;
        void f();
        const C& operator=(const C&);
    };
    
    const C& C::operator=(const C& other)
    {
        if (this != &other)
        {
            this->~C();          // lifetime of *this ends
            new (this) C(other); // new object of type C created
            f();                 // well-defined
        }
        return *this;
    }
    
    C c1;
    C c2;
    c1 = c2; // well-defined
    c1.f();  // well-defined; c1 refers to a new object of type C
```

Se as condições listadas acima não forem atendidas, um ponteiro válido para o novo objeto ainda pode ser obtido aplicando a barreira de otimização de ponteiro [std::launder](<#/doc/utility/launder>):
```cpp
    struct A
    { 
        virtual int transmogrify();
    };
    
    struct B : A
    {
        int transmogrify() override { ::new(this) A; return 2; }
    };
    
    inline int A::transmogrify() { ::new(this) B; return 1; }
    
    void test()
    {
        A i;
        int n = i.transmogrify();
        // int m = i.transmogrify(); // undefined behavior:
        // the new A object is a base subobject, while the old one is a complete object
        int m = std::launder(&i)->transmogrify(); // OK
        assert(m + n == 3);
    }
```

| (desde C++17)  
  
Similarmente, se um objeto é criado no armazenamento de um membro de classe ou elemento de array, o objeto criado é apenas um subobjeto (membro ou elemento) do objeto contendo o objeto original se:

  * o tempo de vida do objeto contendo começou e não terminou
  * o armazenamento para o novo objeto sobrepõe exatamente o armazenamento do objeto original
  * o novo objeto é do mesmo tipo que o objeto original (ignorando a qualificação cv).

Caso contrário, o nome do subobjeto original não pode ser usado para acessar o novo objeto sem [std::launder](<#/doc/utility/launder>):  | | Esta seção está incompleta  
Razão: um exemplo apropriado   
(desde C++17)  
  
#### Fornecendo armazenamento

Como um caso especial, objetos podem ser criados em arrays de unsigned char ou [`std::byte`](<#/doc/types/byte>) (desde C++17) (nesse caso, diz-se que o array _fornece armazenamento_ para o objeto) se

  * o tempo de vida do array começou e não terminou
  * o armazenamento para o novo objeto se encaixa inteiramente dentro do array
  * não há nenhum objeto array que satisfaça essas restrições aninhado dentro do array.

Se essa porção do array anteriormente forneceu armazenamento para outro objeto, o tempo de vida desse objeto termina porque seu armazenamento foi reutilizado, no entanto, o tempo de vida do próprio array não termina (seu armazenamento não é considerado como tendo sido reutilizado).
```cpp
    template<typename... T>
    struct AlignedUnion
    {
        alignas(T...) unsigned char data[max(sizeof(T)...)];
    };
    
    int f()
    {
        AlignedUnion<int, char> au;
        int *p = new (au.data) int;     // OK, au.data provides storage
        char *c = new (au.data) char(); // OK, ends lifetime of *p
        char *d = new (au.data + 1) char();
        return *c + *d; // OK
    }
```

### Acesso fora do tempo de vida

Antes que o tempo de vida de um objeto tenha começado, mas depois que o armazenamento que o objeto ocupará foi alocado, ou, depois que o tempo de vida de um objeto terminou e antes que o armazenamento que o objeto ocupava seja reutilizado ou liberado, os comportamentos dos seguintes usos da expressão glvalue que identifica esse objeto são indefinidos, a menos que o objeto esteja sendo construído ou destruído (um conjunto separado de regras se aplica):

  1. Conversão de lvalue para rvalue (por exemplo, chamada de função para uma função que recebe um valor).
  2. Acesso a um membro de dados não-estático ou uma chamada a uma função membro não-estática.
  3. Ligação de uma referência a um subobjeto de classe base virtual.
  4. Expressões [`dynamic_cast`](<#/doc/language/dynamic_cast>) ou [`typeid`](<#/doc/language/typeid>).

As regras acima também se aplicam a ponteiros (a ligação de uma referência a uma base virtual é substituída pela conversão implícita para um ponteiro para uma base virtual), com duas regras adicionais:

  1. O [`static_cast`](<#/doc/language/static_cast>) de um ponteiro para armazenamento sem um objeto é permitido apenas ao fazer cast para void* (possivelmente cv-qualified).
  2. Ponteiros para armazenamento sem um objeto que foram convertidos para void* (possivelmente cv-qualified) só podem ser [`static_cast`](<#/doc/language/static_cast>) para ponteiros para char (possivelmente cv-qualified), ou unsigned char (possivelmente cv-qualified), ou [`std::byte`](<#/doc/types/byte>) (possivelmente cv-qualified) (desde C++17).

Durante a construção e destruição, geralmente é permitido chamar funções membro não-estáticas, acessar membros de dados não-estáticos e usar [`typeid`](<#/doc/language/typeid>) e [`dynamic_cast`](<#/doc/language/dynamic_cast>). No entanto, como o tempo de vida ainda não começou (durante a construção) ou já terminou (durante a destruição), apenas operações específicas são permitidas. Para uma restrição, veja [chamadas de função virtual durante a construção e destruição](<#/doc/language/virtual>).

### Notas

Até a resolução do [CWG issue 2256](<https://cplusplus.github.io/CWG/issues/2256.html>), as regras de fim de tempo de vida eram diferentes entre objetos não-classe (fim da duração do armazenamento) e objetos classe (ordem inversa de construção):
```cpp
    struct A
    {
        int* p;
        ~A() { std::cout << *p; } // undefined behavior since CWG2256: n does not outlive a
                                  // well-defined until CWG2256: prints 123
    };
    
    void f()
    {
        A a;
        int n = 123; // if n did not outlive a, this could have been optimized out (dead store)
        a.p = &n;
    }
```

Até a resolução de [RU007](<https://wg21.link/p1971r0#RU007>), um membro não-estático de um tipo `const-qualified` ou um tipo de referência impedia que seu objeto contendo fosse transparentemente substituível, o que tornava [std::vector](<#/doc/container/vector>) e [std::deque](<#/doc/container/deque>) difíceis de implementar:
```cpp
    struct X { const int n; };
    union U { X x; float f; };
    
    void tong()
    {
        U u = { {1} };
        u.f = 5.f;                          // OK: creates new subobject of 'u'
        X *p = new (&u.x) X {2};            // OK: creates new subobject of 'u'
        assert(p->n == 2);                  // OK
        assert(u.x.n == 2);                 // undefined until RU007:
                                            // 'u.x' does not name the new subobject
        assert(*std::launder(&u.x.n) == 2); // OK even until RU007
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente aos padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[CWG 119](<https://cplusplus.github.io/CWG/issues/119.html>) | C++98  | um objeto de um tipo classe com um construtor não-trivial só pode iniciar seu tempo de vida quando a chamada do construtor for concluída  | tempo de vida também iniciado para outras inicializações   
[CWG 201](<https://cplusplus.github.io/CWG/issues/201.html>) | C++98  | o tempo de vida de um objeto temporário em um argumento padrão de um construtor padrão era exigido para terminar quando a inicialização do array fosse concluída  | tempo de vida termina antes de inicializar o próximo elemento (também resolve [CWG issue 124](<https://cplusplus.github.io/CWG/issues/124.html>))   
[CWG 274](<https://cplusplus.github.io/CWG/issues/274.html>) | C++98  | um lvalue designando um objeto fora do tempo de vida poderia ser usado como operando de static_cast apenas se a conversão fosse finalmente para char& ou unsigned char& não-cv-qualified | char& e unsigned char& cv-qualified também permitidos   
[CWG 597](<https://cplusplus.github.io/CWG/issues/597.html>) | C++98  | os seguintes comportamentos eram indefinidos: 1. um ponteiro para um objeto fora do tempo de vida é implicitamente convertido para um ponteiro para uma classe base não-virtual 2. um lvalue referindo-se a um objeto fora do tempo de vida é ligado a uma referência a uma classe base não-virtual 3. um lvalue referindo-se a um objeto fora do tempo de vida é usado como operando de um static_cast (com algumas exceções) | tornado bem-definido   
[CWG 2012](<https://cplusplus.github.io/CWG/issues/2012.html>) | C++98  | o tempo de vida das referências era especificado para corresponder à duração do armazenamento, exigindo que as referências extern estivessem vivas antes de seus inicializadores serem executados | tempo de vida começa na inicialização   
[CWG 2107](<https://cplusplus.github.io/CWG/issues/2107.html>) | C++98  | a resolução do [CWG issue 124](<https://cplusplus.github.io/CWG/issues/124.html>) não foi aplicada a construtores de cópia | aplicada   
[CWG 2256](<https://cplusplus.github.io/CWG/issues/2256.html>) | C++98  | o tempo de vida de objetos trivially destructible era inconsistente com outros objetos | tornado consistente   
[CWG 2470](<https://cplusplus.github.io/CWG/issues/2470.html>) | C++98  | mais de um array poderia fornecer armazenamento para o mesmo objeto | apenas um fornece   
[CWG 2489](<https://cplusplus.github.io/CWG/issues/2489.html>) | C++98  | char[] não pode fornecer armazenamento, mas objetos poderiam ser implicitamente criados dentro de seu armazenamento | objetos não podem ser implicitamente criados dentro do armazenamento de char[]   
[CWG 2527](<https://cplusplus.github.io/CWG/issues/2527.html>) | C++98  | se um destrutor não é invocado devido à reutilização de armazenamento e o programa depende de seus efeitos colaterais, o comportamento era indefinido | o comportamento é bem-definido neste caso   
[CWG 2721](<https://cplusplus.github.io/CWG/issues/2721.html>) | C++98  | o ponto exato de tempo de reutilização de armazenamento era incerto para placement new | tornado claro   
[CWG 2849](<https://cplusplus.github.io/CWG/issues/2849.html>) | C++23  | objetos de parâmetro de função eram considerados como objetos temporários para a extensão do tempo de vida de objetos temporários em loops range-for | não considerados como objetos temporários   
[CWG 2854](<https://cplusplus.github.io/CWG/issues/2854.html>) | C++98  | objetos de exceção eram objetos temporários | eles não são objetos temporários   
[CWG 2867](<https://cplusplus.github.io/CWG/issues/2867.html>) | C++17  | o tempo de vida de objetos temporários criados em declarações de structured binding não era estendido | estendido até o final da declaração   
[P0137R1](<https://wg21.link/P0137R1>) | C++98  | criar um objeto em um array de unsigned char reutilizava seu armazenamento | seu armazenamento não é reutilizado   
[P0593R6](<https://wg21.link/P0593R6>) | C++98  | uma chamada de pseudo-destrutor não tinha efeitos | ela destrói o objeto   
[P1971R0](<https://wg21.link/P1971R0>) | C++98  | um membro de dados não-estático de um tipo const-qualified ou um tipo de referência impedia que seu objeto contendo fosse transparentemente substituível | restrição removida   
[P2103R0](<https://wg21.link/P2103R0>) | C++98  | a substituibilidade transparente não exigia manter a estrutura original | exige   
  
### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 6.7.3 Tempo de vida do objeto [basic.life]

    

  * 11.9.5 Construção e destruição [class.cdtor]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 6.7.3 Tempo de vida do objeto [basic.life]

    

  * 11.10.4 Construção e destruição [class.cdtor]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 6.8 Tempo de vida do objeto [basic.life]

    

  * 15.7 Construção e destruição [class.cdtor]

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 3 Tempo de vida do objeto [basic.life]

    

  * 12.7 Construção e destruição [class.cdtor]

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 3.8 Tempo de vida do objeto [basic.life]

    

  * 12.7 Construção e destruição [class.cdtor]

  * Padrão C++03 (ISO/IEC 14882:2003):

    

  * 3.8 Tempo de vida do objeto [basic.life]

    

  * 12.7 Construção e destruição [class.cdtor]

  * Padrão C++98 (ISO/IEC 14882:1998):

    

  * 3.8 Tempo de vida do objeto [basic.life]

    

  * 12.7 Construção e destruição [class.cdtor]

### Veja também

[Documentação C](<#/>) para Tempo de Vida
---