# std::basic_istream&lt;CharT,Traits&gt;::read

basic_istream& read( char_type* s, [std::streamsize](<#/doc/io/streamsize>) count );

  
Extrai caracteres do stream.

Comporta-se como uma [UnformattedInputFunction](<#/doc/named_req/UnformattedInputFunction>). Após construir e verificar o objeto sentinela, extrai caracteres e os armazena em locais sucessivos do array de caracteres cujo primeiro elemento é apontado por `s`. Caracteres são extraídos e armazenados até que qualquer uma das seguintes condições ocorra: 

  * `count` caracteres foram extraídos e armazenados. 

  * A condição de fim de arquivo ocorre na sequência de entrada (neste caso, `setstate(failbit|eofbit)` é chamado). O número de caracteres extraídos com sucesso pode ser consultado usando [`gcount()`](<#/doc/io/basic_istream/gcount>). 

### Parâmetros

s  |  \-  |  ponteiro para o array de caracteres onde os caracteres serão armazenados   
---|---|---
count  |  \-  |  número de caracteres a serem lidos   
  
### Valor de retorno

*this

### Exceções

[failure](<#/doc/io/ios_base/failure>) se um erro ocorreu (o flag de estado de erro não é [goodbit](<#/doc/io/ios_base/iostate>)) e [exceptions()](<#/doc/io/basic_ios/exceptions>) está configurado para lançar exceção para esse estado. 

Se uma operação interna lança uma exceção, ela é capturada e [badbit](<#/doc/io/ios_base/iostate>) é definido. Se [exceptions()](<#/doc/io/basic_ios/exceptions>) está configurado para `badbit`, a exceção é relançada. 

### Observações

Ao usar um locale não-conversor (o locale padrão é não-conversor), o sobrescritor desta função em [std::basic_ifstream](<#/doc/io/basic_ifstream>) pode ser otimizado para I/O em massa de cópia zero (através da sobrescrita de [std::streambuf::xsgetn](<#/doc/io/basic_streambuf/sgetn>)). 

### Exemplo

Execute este código
```
    #include <cstdint>
    #include <fstream>
    #include <iostream>
    #include <sstream>
    #include <string>
     
    int main()
    {
        // read() is often used for binary I/O
        std::string bin = {'\x12', '\x12', '\x12', '\x12'};
        std::istringstream raw(bin);
        std::uint32_t n;
        if (raw.read(reinterpret_cast<char*>(&n), sizeof n))
            std::cout << std::hex << std::showbase << n << '\n';
     
        // prepare file for next snippet
        std::ofstream("test.txt", std::ios::binary) << "abcd1\nabcd2\nabcd3";
     
        // read entire file into string
        if (std::ifstream is{"test.txt", std::ios::binary | std::ios::ate})
        {
            auto size = is.tellg();
            std::string str(size, '\0'); // construct string to stream size
            is.seekg(0);
            if (is.read(&str[0], size))
                std::cout << str << '\n';
        }
    }
```

Output: 
```
    0x12121212
    abcd1
    abcd2
    abcd3
```

### Veja também

[ write](<#/doc/io/basic_ostream/write>) |  insere blocos de caracteres   
(função membro pública de `std::basic_ostream<CharT,Traits>`)  
[ operator>>](<#/doc/io/basic_istream/operator_gtgt>) |  extrai dados formatados   
(função membro pública)  
[ readsome](<#/doc/io/basic_istream/readsome>) |  extrai blocos de caracteres já disponíveis   
(função membro pública)  
[ get](<#/doc/io/basic_istream/get>) |  extrai caracteres   
(função membro pública)  
[ getline](<#/doc/io/basic_istream/getline>) |  extrai caracteres até que o caractere fornecido seja encontrado   
(função membro pública)  
[ fread](<#/doc/io/c/fread>) |  lê de um arquivo   
(função)