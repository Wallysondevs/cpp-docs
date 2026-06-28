# std::basic_stringbuf&lt;CharT,Traits,Allocator&gt;::setbuf

protected:  
virtual [std::basic_streambuf](<#/doc/io/basic_streambuf>)<CharT, Traits>* setbuf( char_type* s, [std::streamsize](<#/doc/io/streamsize>) n )

  
Se `s` for um ponteiro nulo e `n` for zero, esta função não tem efeito.

Caso contrário, o efeito é definido pela implementação: algumas implementações não fazem nada, enquanto outras limpam o membro [std::string](<#/doc/string/basic_string>) atualmente usado como buffer e começam a usar o array de caracteres fornecido pelo usuário de tamanho `n`, cujo primeiro elemento é apontado por `s`, como o buffer e a sequência de caracteres de entrada/saída.

Esta função é virtual protegida, ela só pode ser chamada através de `pubsetbuf()` ou de funções membro de uma classe definida pelo usuário derivada de `std::basic_stringbuf`.

### Parâmetros

s  |  \-  |  ponteiro para o primeiro CharT no buffer fornecido pelo usuário ou nulo   
---|---|---
n  |  \-  |  o número de elementos CharT no buffer fornecido pelo usuário ou zero   
  
### Valor de retorno

`this`

### Notas

O buffer de stream obsoleto [std::strstreambuf](<#/doc/io/strstreambuf>) ou o dispositivo boost.IOStreams [`boost::basic_array`](<https://www.boost.org/doc/libs/release/libs/iostreams/doc/classes/array.html#array>) pode ser usado para implementar o buffering de E/S sobre um array de caracteres fornecido pelo usuário de maneira portável.

### Exemplo

Teste para a funcionalidade `setbuf` do `stringstream`.

Execute este código
```
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        std::ostringstream ss;
        char c[1024] = {};
        ss.rdbuf()->pubsetbuf(c, 1024);
        ss << 3.14 << '\n';
        std::cout << c << '\n';
    }
```

Saída: 
```
    3.14 (no GNU g++/libstdc++ e SunPro C++/roguewave)
    <nada> (no MS Visual Studio 2010, SunPro C++/stlport4, CLang++/libc++)
```

### Veja também

[ pubsetbuf](<#/doc/io/basic_streambuf/pubsetbuf>) | invoca `setbuf()`   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  