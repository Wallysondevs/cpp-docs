# std::unique_ptr&lt;T,Deleter&gt;::get

```cpp
pointer get() const noexcept;  // (desde C++11)
(constexpr desde C++23)
```

  
Retorna um ponteiro para o objeto gerenciado ou nullptr se nenhum objeto for possuído. 

### Parâmetros

(nenhum) 

### Valor de retorno

Ponteiro para o objeto gerenciado ou nullptr se nenhum objeto for possuído. 

### Exemplo

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <memory>
    #include <string>
    #include <utility>
     
    class Res
    {
        std::string s;
     
    public:
        Res(std::string arg) : s{std::move(arg)}
        {
            std::cout << "Res::Res(" << std::quoted(s) << ");\n";
        }
     
        ~Res()
        {
            std::cout << "Res::~Res();\n";
        }
     
    private:
        friend std::ostream& operator<<(std::ostream& os, Res const& r)
        {
            return os << "Res { s = " << std::quoted(r.s) << "; }";
        }
    };
     
    int main()
    {
        std::unique_ptr<Res> up(new Res{"Hello, world!"});
        Res* res = up.get();
        std::cout << *res << '\n';
    }
```

Saída: 
```
    Res::Res("Hello, world!");
    Res { s = "Hello, world!"; }
    Res::~Res();
```

### Veja também

[ release](<#/doc/memory/unique_ptr/release>) | retorna um ponteiro para o objeto gerenciado e libera a posse   
(função membro pública)  