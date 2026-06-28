# Declaração de Union

Uma union é um tipo de classe especial que pode conter apenas um de seus [membros de dados](<#/doc/language/data_members>) não estáticos por vez.

### Sintaxe

O especificador de classe para uma declaração de union é similar à declaração de [class ou struct](<#/doc/language/class>):

---
`union` attr class-head-name `{` member-specification `}`
- **attr** — (desde C++11) sequência opcional de qualquer número de [atributos](<#/doc/language/attributes>)
- **class-head-name** — o nome da union que está sendo definida. Opcionalmente precedido por nested-name-specifier (sequência de nomes e operadores de resolução de escopo, terminando com operador de resolução de escopo). O nome pode ser omitido, caso em que a union é _sem nome_
- **member-specification** — lista de especificadores de acesso, declarações e definições de objetos membro e funções membro.

Uma union pode ter funções membro (incluindo construtores e destrutores), mas não funções virtuais.

Uma union não pode ter classes base e não pode ser usada como uma classe base.

Uma union não pode ter membros de dados não estáticos de tipos de referência.

```cpp
Unions não podem conter um membro de dados não estático com uma função membro especial não trivial (construtor de cópia, operador de atribuição de cópia, ou destrutor).  // (até C++11)
Se uma union contém um membro de dados não estático com uma função membro especial não trivial (construtor de cópia/move, atribuição de cópia/move, ou destrutor), essa função é deletada por padrão na union e precisa ser definida explicitamente pelo programador. Se uma union contém um membro de dados não estático com um construtor padrão não trivial, o construtor padrão da union é deletado por padrão, a menos que um membro variante da union tenha um inicializador de membro padrão. No máximo um membro variante pode ter um inicializador de membro padrão.  // (desde C++11)
```

Assim como na declaração de [struct](<#/doc/language/classes>), o acesso padrão aos membros em uma union é [público](<#/doc/language/access>).

### Explicação

A union é pelo menos tão grande quanto o necessário para armazenar seu maior membro de dados, mas geralmente não é maior. Os outros membros de dados são destinados a serem alocados nos mesmos bytes como parte desse maior membro. Os detalhes dessa alocação são definidos pela implementação, exceto que todos os membros de dados não estáticos têm o mesmo endereço. É comportamento indefinido ler de um membro da union que não foi o mais recentemente escrito. Muitos compiladores implementam, como uma extensão de linguagem não padrão, a capacidade de ler membros inativos de uma union.

Execute este código
```cpp
    #include <cstdint>
    #include <iostream>
    
    union S
    {
        std::int32_t n;     // ocupa 4 bytes
        std::uint16_t s[2]; // ocupa 4 bytes
        std::uint8_t c;     // ocupa 1 byte
    };                      // a union inteira ocupa 4 bytes
    
    int main()
    {
        S s = {0x12345678}; // inicializa o primeiro membro, s.n é agora o membro ativo
        // Neste ponto, ler de s.s ou s.c é comportamento indefinido,
        // mas a maioria dos compiladores o define.
        std::cout << std::hex << "s.n = " << s.n << '\n';
    
        s.s[0] = 0x0011; // s.s é agora o membro ativo
        // Neste ponto, ler de s.n ou s.c é comportamento indefinido,
        // mas a maioria dos compiladores o define.
        std::cout << "s.c is now " << +s.c << '\n' // 11 ou 00, dependendo da plataforma
                  << "s.n is now " << s.n << '\n'; // 12340011 ou 00115678
    }
```

Saída possível:
```
    s.n = 12345678
    s.c is now 0
    s.n is now 115678
```

Cada membro é alocado como se fosse o único membro da classe.

Se os membros de uma union são classes com construtores e destrutores definidos pelo usuário, para alternar o membro ativo, geralmente são necessários um destrutor explícito e um placement new: Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <vector>
    
    union S
    {
        std::string str;
        std::vector<int> vec;
        ~S() {} // precisa saber qual membro está ativo, só é possível em classes union-like 
    };          // a union inteira ocupa max(sizeof(string), sizeof(vector<int>))
    
    int main()
    {
        S s = {"Hello, world"};
        // neste ponto, ler de s.vec é comportamento indefinido
        std::cout << "s.str = " << s.str << '\n';
        s.str.~basic_string();
        new (&s.vec) std::vector<int>;
        // agora, s.vec é o membro ativo da union
        s.vec.push_back(10);
        std::cout << s.vec.size() << '\n';
        s.vec.~vector();
    }
```

Saída:
```
    s.str = Hello, world
    1
```

| (desde C++11)

Se dois membros de union são tipos [standard-layout](<#/doc/named_req/StandardLayoutType>), é bem definido examinar sua subsequência comum em qualquer compilador.

#### Tempo de vida do membro

O [tempo de vida](<#/doc/language/lifetime>) de um membro de union começa quando o membro é ativado. Se outro membro estava ativo anteriormente, seu tempo de vida termina.

Quando o membro ativo de uma union é trocado por uma expressão de atribuição da forma `E1 = E2` que usa o operador de atribuição embutido ou um operador de atribuição trivial, para cada membro de union X que aparece nas subexpressões de acesso a membro e subscrito de array de `E1` que não é uma classe com construtores padrão não triviais ou deletados, se a modificação de X teria comportamento indefinido sob as regras de aliasing de tipo, um objeto do tipo de X é implicitamente criado no armazenamento nomeado; nenhuma inicialização é realizada e o início de seu tempo de vida é sequenciado após o cálculo do valor dos operandos esquerdo e direito e antes da atribuição.
```cpp
    union A { int x; int y[4]; };
    struct B { A a; };
    union C { B b; int k; };
    
    int f()
    {
        C c;               // não inicia o tempo de vida de nenhum membro da union
        c.b.a.y[3] = 4;    // OK: "c.b.a.y[3]", nomeia os membros da union c.b e c.b.a.y;
                           // Isso cria objetos para armazenar os membros da union c.b e c.b.a.y
        return c.b.a.y[3]; // OK: c.b.a.y se refere ao objeto recém-criado
    }
    
    struct X { const int a; int b; };
    union Y { X x; int k; };
    
    void g()
    {
        Y y = {{1, 2}}; // OK, y.x é o membro ativo da union
        int n = y.x.a;
        y.k = 4;   // OK: termina o tempo de vida de y.x, y.k é o membro ativo da union
        y.x.b = n; // comportamento indefinido: y.x.b modificado fora de seu tempo de vida,
                   // "y.x.b" nomeia y.x, mas o construtor padrão de X é deletado,
                   // então o tempo de vida do membro da union y.x não inicia implicitamente
    }
```

Construtor de move trivial, operador de atribuição de move, (desde C++11) construtor de cópia e operador de atribuição de cópia de tipos de union copiam representações de objetos. Se a origem e o destino não são o mesmo objeto, essas funções membro especiais iniciam o tempo de vida de cada objeto (exceto para objetos que não são subobjetos do destino nem de [tipo de tempo de vida implícito](<#/doc/language/lifetime>)) aninhado no destino correspondente ao aninhado na origem antes que a cópia seja realizada. Caso contrário, elas não fazem nada. Dois objetos de union têm o mesmo membro ativo correspondente (se houver) após a construção ou atribuição via funções especiais triviais.

#### Unions anônimas

Uma _union anônima_ é uma definição de union sem nome que não define simultaneamente nenhuma variável (incluindo objetos do tipo union, referências ou ponteiros para a union).

---
`union` `{` member-specification `}` `;`
---

Unions anônimas têm restrições adicionais: elas não podem ter funções membro, não podem ter membros de dados estáticos, e todos os seus membros de dados devem ser públicos. As únicas declarações permitidas são membros de dados não estáticos e declarações [`static_assert`](<#/doc/language/static_assert>) (desde C++11).

Membros de uma union anônima são injetados no escopo envolvente (e não devem entrar em conflito com outros nomes declarados lá).
```cpp
    int main()
    {
        union
        {
            int a;
            const char* p;
        };
        a = 1;
        p = "Jennifer";
    }
```

Unions anônimas com escopo de namespace devem ser declaradas static, a menos que apareçam em um namespace sem nome.

#### Classes tipo union

Uma _classe tipo union_ é uma union, ou uma classe (não union) que tem pelo menos uma union anônima como membro. Uma classe tipo union tem um conjunto de _membros variantes_:

  * os membros de dados não estáticos de suas unions anônimas membro;
  * além disso, se a classe tipo union é uma union, seus membros de dados não estáticos que não são unions anônimas.

Classes tipo union podem ser usadas para implementar [tagged union](<https://en.wikipedia.org/wiki/tagged_union> "enwiki:tagged union").

Execute este código
```cpp
    #include <iostream>
    
    // S tem um membro de dados não estático (tag), três membros enumeradores (CHAR, INT, DOUBLE), 
    // e três membros variantes (c, i, d)
    struct S
    {
        enum{CHAR, INT, DOUBLE} tag;
        union
        {
            char c;
            int i;
            double d;
        };
    };
    
    void print_s(const S& s)
    {
        switch(s.tag)
        {
            case S::CHAR: std::cout << s.c << '\n'; break;
            case S::INT: std::cout << s.i << '\n'; break;
            case S::DOUBLE: std::cout << s.d << '\n'; break;
        }
    }
    
    int main()
    {
        S s = {S::CHAR, 'a'};
        print_s(s);
        s.tag = S::INT;
        s.i = 123;
        print_s(s);
    }
```

Saída:
```
    a
    123
```

A biblioteca padrão C++ inclui [std::variant](<#/doc/utility/variant>), que pode substituir muitos usos de unions e classes tipo union. O exemplo acima pode ser reescrito como Execute este código
```cpp
    #include <iostream>
    #include <variant>
    
    int main()
    {
        std::variant<char, int, double> s = 'a';
        std::visit({ std::cout << x << '\n';}, s);
        s = 123;
        std::visit({ std::cout << x << '\n';}, s);
    }
```

Saída:
```
    a
    123
```

| (desde C++17)

### Palavras-chave

[`union`](<#/doc/keyword/union>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1940](<https://cplusplus.github.io/CWG/issues/1940.html>) | C++11 | unions anônimas permitiam apenas membros de dados não estáticos | `static_assert` também permitido

### Referências

  * C++23 standard (ISO/IEC 14882:2024):
    * 11.5 Unions [class.union]
  * C++20 standard (ISO/IEC 14882:2020):
    * 11.5 Unions [class.union]
  * C++17 standard (ISO/IEC 14882:2017):
    * 12.3 Unions [class.union]
  * C++14 standard (ISO/IEC 14882:2014):
    * 9.5 Unions [class.union]
  * C++11 standard (ISO/IEC 14882:2011):
    * 9.5 Unions [class.union]
  * C++03 standard (ISO/IEC 14882:2003):
    * 9.5 Unions [class.union]
  * C++98 standard (ISO/IEC 14882:1998):
    * 9.5 Unions [class.union]

### Veja também

[ variant](<#/doc/utility/variant>)(C++17) | uma union discriminada type-safe
(modelo de classe)
[documentação C](<#/>) para declaração de Union