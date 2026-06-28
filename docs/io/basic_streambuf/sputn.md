# std::basic_streambuf&lt;CharT,Traits&gt;::sputn, std::basic_streambuf&lt;CharT,Traits&gt;::xsputn

```cpp
std::streamsize sputn( const char_type* s, std::streamsize count );  // (1)
protected:
virtual std::streamsize xsputn( const char_type* s, std::streamsize count );  // (2)
```

  
1) Chama xsputn(s, count) da classe mais derivada.

2) Escreve `count` caracteres na sequência de saída a partir do array de caracteres cujo primeiro elemento é apontado por `s`. Os caracteres são escritos como se por chamadas repetidas a [sputc()](<#/doc/io/basic_streambuf/sputc>). A escrita para quando `count` caracteres são escritos ou uma chamada a [sputc()](<#/doc/io/basic_streambuf/sputc>) teria retornado `Traits::eof()`.

Se a área de escrita (put area) ficar cheia (`pptr() == epptr()`), é não especificado se [overflow()](<#/doc/io/basic_streambuf/overflow>) é realmente chamado ou se seu efeito é alcançado por outros meios.

### Parâmetros

(nenhum)

### Valor de retorno

O número de caracteres escritos com sucesso.

### Observações

"`alcançado por outros meios`" permite E/S em massa (bulk I/O) sem bufferização intermediária: é assim que [std::ofstream::write()](<#/doc/io/basic_ostream/write>) simplesmente passa o ponteiro para a chamada de sistema apropriada em algumas implementações.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        std::ostringstream s1;
        std::streamsize sz = s1.rdbuf()->sputn("This is a test", 14);
        s1 << '\n';
        std::cout << "The call to sputn() returned " << sz << '\n'
                  << "The output sequence contains " << s1.str();
     
        std::istringstream s2;
        sz = s2.rdbuf()->sputn("This is a test", 14);
        std::cout << "The call to sputn() on an input stream returned " << sz << '\n';
    }
```

Saída:
```
    The call to sputn() returned 14
    The output sequence contains This is a test
    The call to sputn() on an input stream returned 0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 565](<https://cplusplus.github.io/LWG/issue565>) | C++98  | `xsputn()` sempre chamava [overflow()](<#/doc/io/basic_streambuf/overflow>) se pptr() == epptr() | não precisa ser chamado de fato   
  
### Veja também

[ sgetn](<#/doc/io/basic_streambuf/sgetn>) |  invoca xsgetn()   
(função membro pública)  