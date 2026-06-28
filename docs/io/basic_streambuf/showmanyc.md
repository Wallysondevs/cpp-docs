# std::basic_streambuf&lt;CharT,Traits&gt;::showmanyc

protected:  
virtual [std::streamsize](<#/doc/io/streamsize>) showmanyc();

  
Estima o número de caracteres disponíveis para entrada na sequência de caracteres associada. É garantido que [underflow()](<#/doc/io/basic_streambuf/underflow>) não retornará Traits::eof() nem lançará uma exceção até que pelo menos essa quantidade de caracteres seja extraída.

### Parâmetros

(nenhum)

### Valor de retorno

O número de caracteres que estão certamente disponíveis na sequência de caracteres associada, ou -1 se `showmanyc` puder determinar, sem bloquear, que nenhum caractere está disponível. Se `showmanyc` retornar -1, [underflow()](<#/doc/io/basic_streambuf/underflow>) e [uflow()](<#/doc/io/basic_streambuf/uflow>) definitivamente retornarão Traits::eof ou lançarão uma exceção.

A versão da classe base retorna ​0​, o que significa "incerto se há caracteres disponíveis na sequência associada".

### Observações

O nome desta função significa "stream: how many characters?" (fluxo: quantos caracteres?), então é pronunciado "S how many C", em vez de "show many C".

### Exemplo

| Esta seção está incompleta  
Motivo: sem exemplo   
  
### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 159](<https://cplusplus.github.io/LWG/issue159>) | C++98  | É garantido que [underflow()](<#/doc/io/basic_streambuf/underflow>) não falhará até que pelo menos `showmanyc()` caracteres sejam fornecidos  | estendeu a garantia para permitir que pelo menos `showmanyc()` caracteres sejam extraídos   
  
### Veja também

[ in_avail](<#/doc/io/basic_streambuf/in_avail>) | obtém o número de caracteres imediatamente disponíveis na área de leitura   
(função membro pública)  
[ showmanyc](<#/doc/io/basic_filebuf/showmanyc>)[virtual] | opcionalmente fornece o número de caracteres disponíveis para entrada do arquivo   
(função membro protegida virtual de `std::basic_filebuf<CharT,Traits>`)