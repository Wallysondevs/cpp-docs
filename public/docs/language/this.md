# O ponteiro this

### Sintaxe
  
---  
`this`
  
A expressão this é uma [expressão](<#/doc/language/expressions>) [prvalue](<#/doc/language/value_category>) cujo valor é o endereço do [parâmetro de objeto implícito](<#/doc/language/overload_resolution>) (objeto no qual a função membro de objeto implícito está sendo chamada). Ela pode aparecer nos seguintes contextos: 

1) Dentro do corpo de qualquer [função membro de objeto implícito](<#/doc/language/member_functions>), incluindo [lista de inicializadores de membro](<#/doc/language/initializer_list>), e [corpo de expressão lambda](<#/doc/language/lambda>) (desde C++11).

2) Dentro da [declaração](<#/doc/language/function>) de qualquer função membro de objeto implícito em qualquer lugar após a sequência (opcional) de qualificadores cv, incluindo a [especificação de exceção](<#/doc/language/exceptions>) e o tipo de retorno final (desde C++11).

3) Dentro de [inicializador de membro padrão](<#/doc/language/data_members>). 4) Dentro da [lista de captura](<#/doc/language/lambda>) de uma expressão lambda. | (desde C++11)  
  
### Explicação

this só pode se associar à classe envolvente mais interna de sua aparição, mesmo que a aparição seja inválida no contexto: 
```cpp
    class Outer
    {
        int a[sizeof(*this)];            // Erro: não está dentro de uma função membro
        unsigned int sz = sizeof(*this); // OK: em inicializador de membro padrão
    
        void f()
        {
            int b[sizeof(*this)];     // OK
    
            struct Inner
            {
                int c[sizeof(*this)]; // Erro: não está dentro de uma função membro de Inner
                                      // “this” não está associado a Outer
                                      // mesmo que esteja dentro de uma função membro de Outer
            };
        }
    };
```

O tipo de this em uma função membro da classe `X` é `X*` (ponteiro para X). Se a função membro for [declarada com uma sequência de qualificadores cv](<#/doc/language/member_functions>) _cv_ , o tipo de this é `_cv_ X*` (ponteiro para X identicamente qualificado por cv). Como construtores e destrutores não podem ser declarados com qualificadores cv, o tipo de this neles é sempre `X*`, mesmo ao construir ou destruir um objeto const. 

Em templates de classe, this é uma [expressão dependente](<#/doc/language/dependent_name>), e this-> explícito pode ser usado para forçar outra expressão a se tornar dependente. 
```cpp
    template<typename T>
    struct B
    {
        int var;
    };
    
    template<typename T>
    struct D : B<T>
    {
        D()
        {
            // var = 1;    // Erro: “var” não foi declarado neste escopo
            this->var = 1; // OK
        }
    };
```

[Durante a construção](<#/doc/language/initializer_list>) de um objeto, se o valor do objeto ou de qualquer um de seus subobjetos for acessado através de um glvalue que não foi obtido, direta ou indiretamente, do ponteiro this do construtor, o valor do objeto ou subobjeto assim obtido é não especificado. Em outras palavras, o ponteiro this não pode ter um alias em um construtor: 
```cpp
    extern struct D d;
    
    struct D
    {
        D(int a) : a(a), b(d.a) {} // b(a) ou b(this->a) estaria correto
        int a, b;
    };
    
    D d = D(1); // porque b(d.a) não obteve a através de this, d.b agora é não especificado
```

É possível executar delete this;, se o programa puder garantir que o objeto foi alocado por new, no entanto, isso torna inválido todo ponteiro para o objeto desalocado, incluindo o próprio ponteiro this: após delete this; retornar, tal função membro não pode referenciar um membro de uma classe (já que isso envolve uma desreferência implícita de `this`) e nenhuma outra função membro pode ser chamada. 

Isso pode ser usado na função membro do ponteiro de contagem de referências (por exemplo, [std::shared_ptr](<#/doc/memory/shared_ptr>)) (desde C++11) responsável por decrementar a contagem de referências, quando a última referência ao objeto gerenciado sai do escopo. 
```cpp
    class ref
    {
        // ...
        void incRef() { ++mnRef; }
        void decRef() { if (--mnRef == 0) delete this; }
    };
```

### Palavras-chave

[`this`](<#/doc/keyword/this>)

### Exemplo
```cpp
    class T
    {
        int x;
    
        void foo()
        {
            x = 6;       // o mesmo que this->x = 6;
            this->x = 5; // uso explícito de this->
        }
    
        void foo() const
        {
        //  x = 7; // Erro: *this é constante
        }
    
        void foo(int x) // o parâmetro x sombreia o membro com o mesmo nome
        {
            this->x = x; // x não qualificado refere-se ao parâmetro
                         // “this->” é necessário para desambiguação
        }
    
        int y;
        T(int x) : x(x),      // usa o parâmetro x para inicializar o membro x
                   y(this->x) // usa o membro x para inicializar o membro y
        {}
    
        T& operator=(const T& b)
        {
            x = b.x;
            return *this; // muitos operadores sobrecarregados retornam *this
        }
    };
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[CWG 760](<https://cplusplus.github.io/CWG/issues/760.html>) | C++98  | quando this é usado em uma classe aninhada, era não especificado se ele estava associado à classe aninhada ou à classe envolvente  | this sempre se associa à classe aninhada mais interna, independentemente de estar em uma função membro não estática   
[CWG 2271](<https://cplusplus.github.io/CWG/issues/2271.html>) | C++98  | this poderia ter um alias ao construir um objeto não-const  | alias também é proibido neste caso   
[CWG 2869](<https://cplusplus.github.io/CWG/issues/2869.html>) | C++98  | não estava claro se this poderia ser usado em uma função membro estática de uma classe não associada  | esclarecido 