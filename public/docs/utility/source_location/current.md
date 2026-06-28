# std::source_location::current

```cpp
static consteval source_location current() noexcept;  // (desde C++20)
```

  
Constrói um novo objeto `source_location` correspondente à localização do local da chamada.

### Parâmetros

(nenhum)

### Valor de retorno

Se `current()` for invocado diretamente (através de uma chamada de função que nomeia `current()`), ele retorna um objeto `source_location` com valores definidos pela implementação representando a localização da chamada. Os valores devem ser afetados pela [diretiva de pré-processador `#line`](<#/doc/preprocessor/line>) da mesma maneira que as macros predefinidas __LINE__ e __FILE__.

Se `current()` for usado em um [inicializador de membro padrão](<#/doc/language/data_members>), o valor de retorno corresponde à localização da definição do construtor ou [inicialização agregada](<#/doc/language/aggregate_initialization>) que inicializa o membro de dados.

Se `current()` for usado em um argumento padrão, o valor de retorno corresponde à localização da chamada para `current()` no local da chamada.

Se `current()` for invocado de qualquer outra maneira, o valor de retorno é não especificado.

### Notas

`std::source_location::current` tipicamente requer a implementação embutida do compilador.

### Exemplo

Execute este código
```
    #include <source_location>
    #include <iostream>
     
    struct src_rec {
        std::source_location srcl = std::source_location::current();
        int dummy = 0;
     
        src_rec(std::source_location loc = std::source_location::current()) :
            srcl(loc)    // values of member refer to the location of the calling function
        {}
        src_rec(int i) : // values of member refer to this location
            dummy(i)
        {}
        src_rec(double)  // values of member refer to this location
        {}
    };
     
    std::source_location src_clone(std::source_location a = std::source_location::current())
    {
        return a;
    }
     
    std::source_location src_make()
    {
        std::source_location b = std::source_location::current();
        return b;
    }
     
    int main()
    {
        src_rec srec0;
        src_rec srec1(0);
        src_rec srec2(0.0);
        auto s0 = std::source_location::current();
        auto s1 = src_clone(s0);
        auto s2 = src_clone();
        auto s3 = src_make();
     
        std::cout
            << srec0.srcl.line() << ' ' << srec0.srcl.function_name() << '\n'
            << srec1.srcl.line() << ' ' << srec1.srcl.function_name() << '\n'
            << srec2.srcl.line() << ' ' << srec2.srcl.function_name() << '\n'
            << s0.line() << ' ' << s0.function_name() << '\n'
            << s1.line() << ' ' << s1.function_name() << '\n'
            << s2.line() << ' ' << s2.function_name() << '\n'
            << s3.line() << ' ' << s3.function_name() << '\n';
    }
```

Saída possível:
```
    31 int main()
    12 src_rec::src_rec(int)
    15 src_rec::src_rec(double)
    34 int main()
    34 int main()
    36 int main()
    25 std::source_location src_make()
```

### Veja também

[ (construtor)](<#/doc/utility/source_location/source_location>) | constrói um novo `source_location` com valores definidos pela implementação   
(função membro pública)  
[ current](<#/doc/utility/basic_stacktrace/current>)[static] | obtém o stacktrace atual ou sua parte dada   
(função membro estática pública de `std::basic_stacktrace<Allocator>`)