# std::launder

Definido no cabeçalho `[<new>](<#/doc/header/new>)`

```c
template< class T >
constexpr T* launder( T* p ) noexcept;
```

Barreira de desvirtualização em relação a p. Retorna um ponteiro para um objeto no mesmo endereço que p representa, enquanto o objeto pode ser um novo subobjeto de classe base cuja classe mais derivada é diferente da do objeto original `*p`.

Formalmente, dado

  * o ponteiro p representa o endereço `A` de um byte na memória
  * um objeto x está localizado no endereço `A`
  * x está dentro de seu [tempo de vida](<#/doc/language/lifetime>)
  * o tipo de x é o mesmo que `T`, ignorando qualificadores cv em todos os níveis
  * cada byte que seria alcançável através do resultado é alcançável através de p (bytes são alcançáveis através de um ponteiro que aponta para um objeto y se esses bytes estiverem dentro do armazenamento de um objeto z que é [pointer-interconvertible](<#/doc/language/static_cast>) com y, ou dentro do array imediatamente envolvente do qual z é um elemento).

Então `std::launder(p)` retorna um valor do tipo `T*` que aponta para o objeto x. Caso contrário, o comportamento é indefinido.

O programa é malformado se `T` for um tipo de função ou void (possivelmente cv-qualificado).

`std::launder` pode ser usado em uma [expressão constante central](<#/doc/language/constant_expression>) se e somente se o valor (convertido) de seu argumento puder ser usado no lugar da invocação da função. Em outras palavras, `std::launder` não relaxa as restrições na avaliação constante.

### Notas

`std::launder` não tem efeito em seu argumento. Seu valor de retorno deve ser usado para acessar o objeto. Assim, é sempre um erro descartar o valor de retorno.

Usos típicos de `std::launder` incluem:

  * Obter um ponteiro para um objeto criado no armazenamento de um objeto existente do mesmo tipo, onde ponteiros para o objeto antigo não podem ser [reutilizados](<#/doc/language/lifetime>) (por exemplo, porque qualquer um dos objetos é um subobjeto de classe base);
  * Obter um ponteiro para um objeto criado por placement `new` a partir de um ponteiro para um objeto que fornece armazenamento para esse objeto.

A restrição de _alcançabilidade_ garante que `std::launder` não pode ser usado para acessar bytes não acessíveis através do ponteiro original, interferindo assim na análise de escape do compilador.
```cpp
    int x[10];
    auto p = std::launder(reinterpret_cast<int(*)[10]>(&x[0])); // OK
    
    int x2[2][10];
    auto p2 = std::launder(reinterpret_cast<int(*)[10]>(&x2[0][0]));
    // Comportamento indefinido: x2[1] seria alcançável através do ponteiro resultante para x2[0]
    // mas não é alcançável a partir da origem
    
    struct X { int a[10]; } x3, x4[2]; // standard layout; assume no padding
    auto p3 = std::launder(reinterpret_cast<int(*)[10]>(&x3.a[0])); // OK
    auto p4 = std::launder(reinterpret_cast<int(*)[10]>(&x4[0].a[0]));
    // Comportamento indefinido: x4[1] seria alcançável através do ponteiro resultante para x4[0].a
    // (que é pointer-interconvertible com x4[0]) mas não é alcançável a partir da origem
    
    struct Y { int a[10]; double y; } x5;
    auto p5 = std::launder(reinterpret_cast<int(*)[10]>(&x5.a[0]));
    // Comportamento indefinido: x5.y seria alcançável através do ponteiro resultante para x5.a
    // mas não é alcançável a partir da origem
```

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <cstddef>
    #include <new>
    
    struct Base
    {
        virtual int transmogrify();
    };
    
    struct Derived : Base
    {
        int transmogrify() override
        {
            new(this) Base;
            return 2;
        }
    };
    
    int Base::transmogrify()
    {
        new(this) Derived;
        return 1;
    }
    
    static_assert(sizeof(Derived) == sizeof(Base));
    
    int main()
    {
        // Caso 1: o novo objeto falhou em ser substituível de forma transparente porque
        // é um subobjeto base, mas o objeto antigo é um objeto completo.
        Base base;
        int n = base.transmogrify();
        // int m = base.transmogrify(); // comportamento indefinido
        int m = std::launder(&base)->transmogrify(); // OK
        assert(m + n == 3);
    
        // Caso 2: acesso a um novo objeto cujo armazenamento é fornecido
        // por um array de bytes através de um ponteiro para o array.
        struct Y { int z; };
        alignas(Y) std::byte s[sizeof(Y)];
        Y* q = new(&s) Y{2};
        const int f = reinterpret_cast<Y*>(&s)->z; // O acesso a membro de classe é comportamento indefinido:
                                                   // reinterpret_cast<Y*>(&s) tem o valor "ponteiro para s" e não aponta para um objeto Y
        const int g = q->z; // OK
        const int h = std::launder(reinterpret_cast<Y*>(&s))->z; // OK
    
        {}(f, g, h); // evoca o efeito [[maybe_unused]]
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 2859](<https://cplusplus.github.io/LWG/issue2859>) | C++17 | definição de _alcançável_ não considerava aritmética de ponteiros a partir de objeto pointer-interconvertible | incluído
[LWG 3495](<https://cplusplus.github.io/LWG/issue3495>) | C++17 | `std::launder` poderia tornar ponteiro para um membro inativo desreferenciável em expressão constante | proibido