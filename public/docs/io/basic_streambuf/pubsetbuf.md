# std::basic_streambuf&lt;CharT,Traits&gt;::pubsetbuf, std::basic_streambuf&lt;CharT,Traits&gt;::setbuf

```cpp
public:
basic_streambuf<CharT, Traits>* pubsetbuf( char_type* s, std::streamsize n )  // (1)
protected:
virtual basic_streambuf<CharT, Traits>* setbuf( char_type* s, std::streamsize n )  // (2)
```

  
1) Chama setbuf(s, n) da classe mais derivada.

2) A versão da classe base desta função não tem efeito. As classes derivadas podem sobrescrever esta função para permitir a remoção ou substituição da sequência de caracteres controlada (o buffer) por um array fornecido pelo usuário, ou para qualquer outro propósito específico da implementação.

### Parâmetros

s  |  \-  |  ponteiro para o primeiro `CharT` no buffer fornecido pelo usuário   
---|---|---
n  |  \-  |  o número de elementos `CharT` no buffer fornecido pelo usuário   
  
### Valor de retorno

1) O valor de retorno de setbuf(s, n).

2) this

### Exemplo

Fornece um buffer de 10k para leitura. No Linux, o utilitário strace pode ser usado para observar o número real de bytes lidos.

Execute este código
```
    #include <fstream>
    #include <iostream>
    #include <string>
     
    int main()
    {
        int cnt = 0;
        std::ifstream file;
        char buf[1024 * 10 + 1];
     
        file.rdbuf()->pubsetbuf(buf, sizeof buf);
     
        file.open("/usr/share/dict/words");
     
        for (std::string line; getline(file, line);)
            ++cnt;
     
        std::cout << cnt << '\n';
    }
```

Saída possível: 
```
    356010
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 158](<https://cplusplus.github.io/LWG/issue158>) | C++98  | o comportamento padrão de `setbuf` era especificado apenas se [gptr()](<#/doc/io/basic_streambuf/gptr>) não fosse nulo e não fosse igual a [egptr()](<#/doc/io/basic_streambuf/gptr>) | especificado como no-op para todos os casos   
  
### Ver também

[ setbuf](<#/doc/io/basic_stringbuf/setbuf>)[virtual] |  tenta substituir a sequência de caracteres controlada por um array   
(função membro virtual protegida de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ setbuf](<#/doc/io/basic_filebuf/setbuf>)[virtual] |  fornece buffer fornecido pelo usuário ou torna este filebuf sem buffer   
(função membro virtual protegida de `std::basic_filebuf<CharT,Traits>`)  
[ setbuf](<#/doc/io/strstreambuf/setbuf>)[virtual] |  tenta substituir a sequência de caracteres controlada por um array   
(função membro virtual protegida de `std::strstreambuf`)  
[ setbuf](<#/doc/io/c/setbuf>) |  define o buffer para um stream de arquivo   
(função)