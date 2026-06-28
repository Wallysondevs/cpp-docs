# std::basic_istream&lt;CharT,Traits&gt;::sync

int sync();

  
Sincroniza o buffer de entrada com a fonte de dados associada.

Comporta-se como [UnformattedInputFunction](<#/doc/named_req/UnformattedInputFunction>), exceto que [gcount()](<#/doc/io/basic_istream/gcount>) não é afetado. Após construir e verificar o objeto sentinela,

Se [rdbuf()](<#/doc/io/basic_ios/rdbuf>) for um ponteiro nulo, retorna -1.

Caso contrário, chama rdbuf()->pubsync(). Se essa função retornar -1, chama setstate(badbit) e retorna -1. Caso contrário, retorna ​0​.

### Parâmetros

(nenhum)

### Valor de retorno

​0​ em caso de sucesso, -1 em caso de falha ou se o stream não suportar esta operação (não estiver em buffer).

### Notas

Assim como com [readsome()](<#/doc/io/basic_istream/readsome>), é de comportamento definido pela implementação se esta função faz algo com streams fornecidos pela biblioteca. A intenção é tipicamente que a próxima operação de leitura capte quaisquer alterações que possam ter sido feitas na sequência de entrada associada depois que o buffer do stream preencheu pela última vez sua área de obtenção (get area). Para conseguir isso, `sync()` pode esvaziar a área de obtenção, ou pode preenchê-la novamente, ou pode não fazer nada. Uma exceção notável é o Visual Studio, onde esta operação descarta a entrada não processada quando chamada com um stream de entrada padrão.

### Exemplo

Demonstra o uso de `sync()` de stream de entrada com entrada de arquivo. Note que a saída aqui é de comportamento definido pela implementação, já que as chamadas para [`std::basic_filebuf::sync`](<#/doc/io/basic_filebuf/sync>) são de comportamento definido pela implementação para leituras.

Execute este código
```
    #include <fstream>
    #include <iostream>
     
    void file_abc()
    {
        std::ofstream f("test.txt");
        f << "abc\n";
    }
     
    void file_123()
    {
        std::ofstream f("test.txt");
        f << "123\n";
    }
     
    int main()
    {
        file_abc(); // file now contains "abc"
        std::ifstream f("test.txt");
        std::cout << "Reading from the file\n";
        char c;
        f >> c;
        std::cout << c;
        file_123(); // file now contains "123"
        f >> c;
        std::cout << c;
        f >> c;
        std::cout << c << '\n';
        f.close();
     
        file_abc(); // file now contains "abc"
        f.open("test.txt");
        std::cout << "Reading from the file, with sync()\n";
        f >> c;
        std::cout << c;
        file_123(); // file now contains "123"
        f.sync();
        f >> c;
        std::cout << c;
        f >> c;
        std::cout << c << '\n';
    }
```

Saída possível: 
```
    Reading from the file
    abc
    Reading from the file, with sync()
    a23
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 62](<https://cplusplus.github.io/LWG/issue62>) | C++98  | `sync()` retornava traits::eof() se rdbuf()->pubsync() retornasse -1 | retorna -1 neste caso   
  
### Veja também

[ sync](<#/doc/io/basic_streambuf/pubsync>)[virtual] |  sincroniza os buffers com a sequência de caracteres associada   
(função membro virtual protegida de `std::basic_streambuf<CharT,Traits>`)  
[ flush](<#/doc/io/basic_ostream/flush>) |  sincroniza com o dispositivo de armazenamento subjacente   
(função membro pública de `std::basic_ostream<CharT,Traits>`)