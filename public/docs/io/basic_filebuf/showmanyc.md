# std::basic_filebuf&lt;CharT,Traits&gt;::showmanyc

protected:  
virtual [std::streamsize](<#/doc/io/streamsize>) showmanyc()

  
Se implementado, retorna o número de caracteres restantes para ler do arquivo.

### Parâmetros

(nenhum) 

### Valor de retorno

O número de caracteres disponíveis para leitura do arquivo, ou -1 se o fim do arquivo foi atingido.

### Notas

Esta função é opcional. Se não implementada, esta função retorna 0 (já que a versão da classe base std::basic_streambuf::showmanyc é chamada)

Seja implementada ou não, esta função é normalmente chamada por std::basic_streambuf::in_avail se a get area estiver vazia.

O nome desta função significa "stream: quantos caracteres?", então é pronunciado "S how many C", em vez de "show many C"

### Exemplo

teste de implementação para ver se showmanyc() é implementado para filebuf

Run this code
```cpp
    #include <fstream>
    #include <iostream>
    
    struct mybuf : std::filebuf
    {
         using std::filebuf::showmanyc;
    };
    
    int main()
    {
        mybuf fin;
        fin.open("main.cpp", std::ios_base::in);
        std::cout << "showmanyc() returns " << fin.showmanyc() << '\n';
    }
```

Saída possível: 
```
    showmanyc() returns 267
```

### Veja também

[ in_avail](<#/doc/io/basic_streambuf/in_avail>) | obtém o número de caracteres imediatamente disponíveis na get area   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ readsome](<#/doc/io/basic_istream/readsome>) | extrai blocos de caracteres já disponíveis   
(função membro pública de `std::basic_istream<CharT,Traits>`)