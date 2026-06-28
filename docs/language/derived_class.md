# Classes Derivadas

Qualquer tipo de classe (seja declarado com a palavra-chave `class` ou `struct`) pode ser declarado como _derivado_ de uma ou mais _classes base_ que, por sua vez, podem ser derivadas de suas próprias classes base, formando uma hierarquia de herança.

### Sintaxe

A lista de classes base é fornecida na base-clause da [sintaxe de declaração de classe](<#/doc/language/class>). A base-clause consiste no caractere `:` seguido por uma lista separada por vírgulas de um ou mais base-specifiers.

---
attr ﻿(optional) class-or-computed | (1) |
---|---|---
attr ﻿(optional) `virtual` class-or-computed | (2) |
attr ﻿(optional) access-specifier class-or-computed | (3) |
attr ﻿(optional) `virtual` access-specifier class-or-computed | (4) |
attr ﻿(optional) access-specifier `virtual` class-or-computed | (5) |

1) Especifica uma herança não-virtual com acessibilidade de membro padrão.

2) Especifica uma herança virtual com acessibilidade de membro padrão.

3) Especifica uma herança não-virtual com acessibilidade de membro fornecida.

4) Especifica uma herança virtual com acessibilidade de membro fornecida.

5) O mesmo que 4), `virtual` e access-specifier podem aparecer em qualquer ordem.

- **attr** — (desde C++11) sequência de qualquer número de [atributos](<#/doc/language/attributes>)
- **access-specifier** — um de `private`, `public`, ou `protected`
- **class-or-computed** — um de

  * nested-name-specifier ﻿(optional) type-name
  * nested-name-specifier `template` simple-template-id

|

  * [decltype-specifier](<#/doc/language/decltype>)

| (desde C++11)

  * [pack-index-specifier ](<#/doc/language/pack_indexing>)

| (desde C++26)

Um [especificador de tipo elaborado](<#/doc/language/elaborated_type_specifier>) não pode aparecer diretamente como class-or-computed devido a limitações de sintaxe.

```cpp
base-specifiers em uma base-clause podem ser expansões de pack. Uma classe ou struct declarada `final` não pode ser denotada por class-or-computed.  // (desde C++11)
```

Se access-specifier for omitido, o padrão é `public` para classes derivadas declaradas com a palavra-chave `struct` e `private` para classes derivadas declaradas com a palavra-chave `class`.
```cpp
    struct Base
    {
        int a, b, c;
    };
    
    // every object of type Derived includes Base as a subobject
    struct Derived : Base
    {
        int b;
    };
    
    // every object of type Derived2 includes Derived and Base as subobjects
    struct Derived2 : Derived
    {
        int c;
    };
```

Classes denotadas por class-or-computed listadas na base-clause são classes base diretas. Suas bases são classes base indiretas. A mesma classe não pode ser especificada como uma classe base direta mais de uma vez, mas a mesma classe pode ser tanto uma classe base direta quanto indireta.

Cada classe base direta e indireta está presente, como _subobjeto de classe base_, dentro da representação de objeto da classe derivada em um offset dependente da ABI. Classes base vazias geralmente não aumentam o tamanho do objeto derivado devido à [otimização de classe base vazia](<#/doc/language/ebo>). Os construtores dos subobjetos de classe base são chamados pelo construtor da classe derivada: argumentos podem ser fornecidos a esses construtores na [lista de inicializadores de membro](<#/doc/language/initializer_list>).

### Classes base virtuais

Para cada classe base distinta que é especificada `virtual`, o objeto mais derivado contém apenas um subobjeto de classe base desse tipo, mesmo que a classe apareça muitas vezes na hierarquia de herança (desde que seja herdada `virtual` todas as vezes).
```cpp
    struct B { int n; };
    class X : public virtual B {};
    class Y : virtual public B {};
    class Z : public B {};
    
    // every object of type AA has one X, one Y, one Z, and two B's:
    // one that is the base of Z and one that is shared by X and Y
    struct AA : X, Y, Z
    {
        AA()
        {
            X::n = 1; // modifies the virtual B subobject's member
            Y::n = 2; // modifies the same virtual B subobject's member
            Z::n = 3; // modifies the non-virtual B subobject's member
    
            std::cout << X::n << Y::n << Z::n << '\n'; // prints 223
        }
    };
```

Um exemplo de hierarquia de herança com classes base virtuais é a hierarquia de iostreams da standard library: [std::istream](<#/doc/io/basic_istream>) e [std::ostream](<#/doc/io/basic_ostream>) são derivadas de [std::ios](<#/doc/io/basic_ios>) usando herança virtual. [std::iostream](<#/doc/io/basic_iostream>) é derivada de ambos [std::istream](<#/doc/io/basic_istream>) e [std::ostream](<#/doc/io/basic_ostream>), então cada instância de [std::iostream](<#/doc/io/basic_iostream>) contém um subobjeto [std::ostream](<#/doc/io/basic_ostream>), um subobjeto [std::istream](<#/doc/io/basic_istream>), e apenas um subobjeto [std::ios](<#/doc/io/basic_ios>) (e, consequentemente, um [std::ios_base](<#/doc/io/ios_base>)).

Todos os subobjetos base virtuais são inicializados antes de qualquer subobjeto base não-virtual, então apenas a classe mais derivada chama os construtores das bases virtuais em sua [lista de inicializadores de membro](<#/doc/language/initializer_list>):
```cpp
    struct B
    {
        int n;
    
        B(int x) : n(x) {}
    };
    
    struct X : virtual B { X() : B(1) {} };
    struct Y : virtual B { Y() : B(2) {} };
    struct AA : X, Y     { AA() : B(3), X(), Y() {} };
    
    // the default constructor of AA calls the default constructors of X and Y
    // but those constructors do not call the constructor of B because B is a virtual base
    AA a; // a.n == 3
    
    // the default constructor of X calls the constructor of B
    X x;  // x.n == 1
```

Existem [regras especiais](<#/doc/language/unqualified_lookup>) para a pesquisa de nome não qualificada para membros de classe quando a herança virtual está envolvida (às vezes referidas como as regras de dominância).

### Herança pública

Quando uma classe usa o [especificador de acesso de membro](<#/doc/language/access>) `public` para derivar de uma base, todos os membros públicos da classe base são acessíveis como membros públicos da classe derivada e todos os membros protegidos da classe base são acessíveis como membros protegidos da classe derivada (membros privados da base nunca são acessíveis, a menos que sejam amigos).

A herança pública modela a relação de subtipo da programação orientada a objetos: o objeto da classe derivada É-UM objeto da classe base. Referências e ponteiros para um objeto derivado devem ser utilizáveis por qualquer código que espere referências ou ponteiros para qualquer uma de suas bases públicas (veja [LSP](<https://en.wikipedia.org/wiki/Liskov_substitution_principle> "enwiki:Liskov substitution principle")) ou, em termos de [DbC](<https://en.wikipedia.org/wiki/Design_by_contract> "enwiki:Design by contract"), uma classe derivada deve manter os invariantes de classe de suas bases públicas, não deve fortalecer nenhuma pré-condição ou enfraquecer nenhuma pós-condição de uma função membro que ela [sobrescreve](<#/doc/language/virtual>).

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <vector>
    
    struct MenuOption { std::string title; };
    
    // Menu is a vector of MenuOption: options can be inserted, removed, reordered...
    // and has a title.
    class Menu : public std::vector<MenuOption>
    {
    public:
        std::string title;
    
        void print() const
        {
            std::cout << title << ":\n";
            for (std::size_t i = 0, s = size(); i < s; ++i)
                std::cout << "  " << (i + 1) << ". " << at(i).title << '\n';
        }
    };
    // Nota: Menu::title não é problemático porque seu papel é independente da classe base.
    
    enum class Color { WHITE, RED, BLUE, GREEN };
    
    void apply_terminal_color(Color) { /* OS-specific */ }
    
    // ISSO É RUIM!
    // ColorMenu is a Menu where every option has a custom color.
    class ColorMenu : public Menu
    {
    public:
        std::vector<Color> colors;
    
        void print() const
        {
            std::cout << title << ":\n";
    
            for (std::size_t i = 0, s = size(); i < s; ++i)
            {
                std::cout << "  " << (i + 1) << ". ";
                apply_terminal_color(colors[i]);
                std::cout << at(i).title << '\n';
                apply_terminal_color(Color::WHITE);
            }
        }
    };
    // ColorMenu precisa dos seguintes invariantes que não podem ser satisfeitos
    // pela herança pública de Menu, por exemplo:
    // - ColorMenu::colors e Menu devem ter o mesmo número de elementos
    // - Para fazer sentido, chamar erase() também deve remover elementos de colors,
    //   a fim de permitir que as opções mantenham suas cores
    // Basicamente, cada chamada não-const a um método std::vector quebrará o invariante
    // de ColorMenu e exigirá correção do usuário, gerenciando corretamente as cores.
    
    int main()
    {
        ColorMenu color_menu;
    
        // O grande problema desta classe é que devemos manter ColorMenu::Color
        // sincronizado com Menu.
        color_menu.push_back(MenuOption{"Some choice"});
    
        // color_menu.print(); // ERRO! colors[i] em print() está fora do limite
    
        color_menu.colors.push_back(Color::RED);
    
        color_menu.print(); // OK: colors e Menu têm o mesmo número de elementos
    }
```

### Herança protegida

Quando uma classe usa o [especificador de acesso de membro](<#/doc/language/access>) `protected` para derivar de uma base, todos os membros públicos e protegidos da classe base são acessíveis como membros protegidos da classe derivada (membros privados da base nunca são acessíveis, a menos que sejam amigos).

A herança protegida pode ser usada para "polimorfismo controlado": dentro dos membros de Derived, bem como dentro dos membros de todas as classes posteriormente derivadas, a classe derivada É-UMA base: referências e ponteiros para Derived podem ser usados onde referências e ponteiros para Base são esperados.

### Herança privada

Quando uma classe usa o [especificador de acesso de membro](<#/doc/language/access>) `private` para derivar de uma base, todos os membros públicos e protegidos da classe base são acessíveis como membros privados da classe derivada (membros privados da base nunca são acessíveis, a menos que sejam amigos).

A herança privada é comumente usada em design baseado em políticas, já que as políticas são geralmente classes vazias, e usá-las como bases tanto habilita o polimorfismo estático quanto aproveita a [otimização de classe base vazia](<#/doc/language/ebo>).

A herança privada também pode ser usada para implementar a relação de composição (o subobjeto da classe base é um detalhe de implementação do objeto da classe derivada). Usar um membro oferece melhor encapsulamento e é geralmente preferido, a menos que a classe derivada exija acesso a membros protegidos (incluindo construtores) da base, precise sobrescrever um membro virtual da base, precise que a base seja construída antes e destruída depois de algum outro subobjeto base, precise compartilhar uma base virtual ou precise controlar a construção de uma base virtual. O uso de membros para implementar a composição também não é aplicável no caso de herança múltipla de um [parameter pack](<#/doc/language/parameter_pack>) ou quando as identidades das classes base são determinadas em tempo de compilação através de metaprogramação de template.

Similar à herança protegida, a herança privada também pode ser usada para polimorfismo controlado: dentro dos membros da derivada (mas não dentro de classes posteriormente derivadas), a derivada É-UMA base.
```cpp
    template<typename Transport>
    class service : private Transport // private inheritance from the Transport policy
    {
    public:
        void transmit()
        {
            this->send(...); // envia usando qualquer transporte que foi fornecido
        }
    };
    
    // TCP transport policy
    class tcp
    {
    public:
        void send(...);
    };
    
    // UDP transport policy
    class udp
    {
    public:
        void send(...);
    };
    
    service<tcp> service(host, port); 
    service.transmit(...); // envia via TCP
```

### Pesquisa de nome de membro

As regras de pesquisa de nome não qualificada e qualificada para membros de classe são detalhadas em [pesquisa de nome](<#/doc/language/lookup>).

### Palavras-chave

[`virtual`](<#/doc/keyword/virtual>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 1710](<https://cplusplus.github.io/CWG/issues/1710.html>) | C++98 | a sintaxe de class-or-decltype tornava impossível derivar de
uma classe dependente onde o disambiguador template é necessário | template permitido

### Veja também

*   [funções virtuais](<#/doc/language/virtual>)
*   [classes abstratas](<#/doc/language/abstract_class>)
