# std::type_info::name

const char* name() const; |  | (noexcept desde C++11)  

  
Retorna uma string de caracteres terminada em nulo definida pela implementação contendo o nome do tipo. Nenhuma garantia é dada; em particular, a string retornada pode ser idêntica para vários tipos e mudar entre invocações do mesmo programa.

### Parâmetros

(nenhum)

### Valor de retorno

[String de caracteres terminada em nulo](<#/doc/string/byte>) contendo o nome do tipo.

### Notas

O tempo de vida do array apontado pelo ponteiro retornado não é especificado, mas na prática ele persiste enquanto a estrutura de dados RTTI para o tipo dado existir, o que tem tempo de vida da aplicação, a menos que seja carregado de uma biblioteca dinâmica (que pode ser descarregada).

Algumas implementações (como MSVC, IBM, Oracle) produzem um nome de tipo legível por humanos. Outras, notavelmente gcc e clang, retornam o nome "mangled", que é especificado pela [Itanium C++ ABI](<https://itanium-cxx-abi.github.io/cxx-abi/abi.html#typeid>). O nome "mangled" pode ser convertido para uma forma legível por humanos usando uma API específica da implementação, como [`abi::__cxa_demangle`](<https://gcc.gnu.org/onlinedocs/libstdc++/manual/ext_demangling.html>) diretamente ou através de [`boost::core::demangle`](<https://www.boost.org/doc/libs/release/libs/core/doc/html/core/demangle.html>). Ele também pode ser passado através do utilitário de linha de comando c++filt -t.

### Exemplo

Execute este código
```cpp
    #include <boost/core/demangle.hpp>
    #include <cstdlib>
    #include <iostream>
    #include <string>
    #include <typeinfo>
    
    struct Base { virtual ~Base() = default; };
    struct Derived : Base {};
    
    int main()
    {
        Base b1;
        Derived d1;
    
        const Base* pb = &b1;
        std::cout << typeid(*pb).name() << '\n';
        pb = &d1;
        std::cout << typeid(*pb).name() << '\n';
    
        std::string real_name = boost::core::demangle(typeid(pb).name());
        std::cout << typeid(pb).name() << " => " << real_name << '\n';
    
        std::cout << "c++filt => " << std::flush;
        std::string s = typeid(pb).name();
        std::system(("c++filt -t " + s).data());
    }
```

Saída possível:
```
    // GCC/Clang:
    4Base
    7Derived
    PK4Base => Base const*
    c++filt => Base const*
    
    // MSVC:
    struct Base
    struct Derived
    struct Base const * __ptr64 => struct Base const * __ptr64
```

### Veja também

[ hash_code](<#/doc/types/type_info/hash_code>)(C++11) | retorna um valor que é idêntico para os mesmos tipos   
(função membro pública)  